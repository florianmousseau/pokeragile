package room

import (
	"math"
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"
)

// Similar is a delivered story of the team whose title shares words with the
// story on the table: the card kept for it and the card it was delivered like.
type Similar struct {
	Title     string `json:"title"`
	Estimate  string `json:"estimate"`
	LooksLike string `json:"looksLike,omitempty"`
}

const (
	// SimilarFrom is how many measured stories a room holds before it names
	// any: fewer make a misleading reference.
	SimilarFrom = 5
	// MaxSimilar bounds the stories named for one story on the table.
	MaxSimilar = 3
	// similarFloor is the share of the weighted words two titles must have in
	// common. The browser computes the same list: frontend/src/lib/similar.ts.
	similarFloor = 0.15
	minWordRunes = 3
	scoreGrain   = 1e6
)

// titleWords is the set of words a title is compared on.
func titleWords(title string) map[string]bool {
	fields := strings.FieldsFunc(strings.ToLower(title), func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r)
	})
	words := map[string]bool{}
	for _, word := range fields {
		if utf8.RuneCountInString(word) >= minWordRunes {
			words[word] = true
		}
	}
	return words
}

type scored struct {
	index int
	score float64
}

// SimilarStories names up to MaxSimilar measured stories whose titles are the
// closest to the story at current, closest first. A word weighs less the more
// measured titles hold it. Nothing under SimilarFrom measured stories, and
// nothing for a title too far from all of them.
func SimilarStories(stories []Story, current int) []Similar {
	if current < 0 || current >= len(stories) {
		return nil
	}
	past := measuredBut(stories, current)
	if len(past) < SimilarFrom {
		return nil
	}
	sets := make(map[int]map[string]bool, len(past))
	held := map[string]int{}
	for _, i := range past {
		sets[i] = titleWords(stories[i].Title)
		for word := range sets[i] {
			held[word]++
		}
	}
	weight := func(word string) float64 {
		return math.Log(float64(len(past)+1) / float64(max(held[word], 1)))
	}
	wanted := titleWords(stories[current].Title)
	var near []scored
	for _, i := range past {
		if score := overlap(wanted, sets[i], weight); score >= similarFloor {
			near = append(near, scored{i, score})
		}
	}
	slices.SortStableFunc(near, closestThenLatest)
	var out []Similar
	for _, c := range near[:min(len(near), MaxSimilar)] {
		s := stories[c.index]
		out = append(out, Similar{Title: s.Title, Estimate: s.Estimate, LooksLike: s.LooksLike})
	}
	return out
}

// measuredBut lists the positions of the measured stories, leaving out skip.
func measuredBut(stories []Story, skip int) []int {
	var out []int
	for i, s := range stories {
		if i != skip && measured(s) {
			out = append(out, i)
		}
	}
	return out
}

// closestThenLatest sorts the closest title first and, among equals, the most
// recent story first.
func closestThenLatest(a, b scored) int {
	switch {
	case a.score > b.score:
		return -1
	case a.score < b.score:
		return 1
	}
	return b.index - a.index
}

// SimilarShown is SimilarStories for a reader the room cannot tell from one who
// has not voted: nothing during the vote of a room that hides them until then.
func (s Snapshot) SimilarShown() []Similar {
	if s.HideSimilar && s.State == StateVoting {
		return nil
	}
	return SimilarStories(s.Stories, s.Current)
}

// overlap is the weight of the words two titles share over the weight of all
// their words: 0 with no word in common, 1 for the same words.
func overlap(a, b map[string]bool, weight func(string) float64) float64 {
	shared, all := 0.0, 0.0
	for word := range a {
		all += weight(word)
		if b[word] {
			shared += weight(word)
		}
	}
	for word := range b {
		if !a[word] {
			all += weight(word)
		}
	}
	if all == 0 {
		return 0
	}
	// Rounded: two titles as close as each other must tie whatever the order
	// the words were summed in.
	return math.Round(shared/all*scoreGrain) / scoreGrain
}
