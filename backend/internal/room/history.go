package room

import (
	"slices"
	"strings"
)

// Restore replays the estimated stories a browser kept from an earlier life of
// this room address: the room itself lives in memory and forgets them. A story
// already in the list is left as it is, one whose card is not in the deck is
// dropped, and a measure that is not valid is dropped alone. Nothing is
// replayed once the list was cleared here. It returns how many stories joined.
func (r *Room) Restore(initiatorID string, kept []Story) int {
	restored := 0
	r.mutate(func() {
		if r.mayAdd(initiatorID) != nil || r.cleared {
			return
		}
		for _, story := range kept {
			if r.restoreStory(story) {
				restored++
			}
		}
		if restored > 0 {
			r.logActivity(r.nameOf(initiatorID), "stories_added")
		}
	})
	return restored
}

// restoreStory appends one kept story when the list can take it. Callers hold r.mu.
func (r *Room) restoreStory(story Story) bool {
	title := cut(strings.TrimSpace(story.Title), MaxStoryLength)
	switch {
	case title == "" || len(r.stories) >= MaxStories:
		return false
	case !slices.Contains(r.cards, story.Estimate):
		return false
	case slices.ContainsFunc(r.stories, func(s Story) bool { return s.Title == title }):
		return false
	}
	out := Story{Title: title, Estimate: story.Estimate}
	if story.Actual != nil && story.Actual.valid() {
		actual := *story.Actual
		out.Actual = &actual
	}
	r.stories = append(r.stories, out)
	return true
}
