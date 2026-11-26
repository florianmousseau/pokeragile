package room

import (
	"encoding/json"
	"os"
	"slices"
	"testing"
)

type similarVectors struct {
	Past  []Similar `json:"past"`
	Cases []struct {
		Name    string   `json:"name"`
		Title   string   `json:"title"`
		Similar []string `json:"similar"`
	} `json:"cases"`
}

func loadSimilarVectors(t *testing.T) similarVectors {
	t.Helper()
	raw, err := os.ReadFile("testdata/similar.json")
	if err != nil {
		t.Fatal(err)
	}
	var v similarVectors
	if err := json.Unmarshal(raw, &v); err != nil {
		t.Fatal(err)
	}
	if len(v.Past) < SimilarFrom || len(v.Cases) == 0 {
		t.Fatalf("vectors too thin to prove anything: %d past, %d cases", len(v.Past), len(v.Cases))
	}
	return v
}

func measuredPast(past []Similar) []Story {
	var stories []Story
	for _, p := range past {
		stories = append(stories, Story{Title: p.Title, Estimate: p.Estimate, LooksLike: p.LooksLike, Actual: &Actual{Added: 10}})
	}
	return stories
}

func titles(similar []Similar) []string {
	out := []string{}
	for _, s := range similar {
		out = append(out, s.Title)
	}
	return out
}

func TestSimilarStoriesSharedVectors(t *testing.T) {
	v := loadSimilarVectors(t)
	for _, c := range v.Cases {
		t.Run(c.Name, func(t *testing.T) {
			stories := append(measuredPast(v.Past), Story{Title: c.Title})
			got := titles(SimilarStories(stories, len(stories)-1))
			if !slices.Equal(got, c.Similar) {
				t.Fatalf("similar to %q = %q, want %q", c.Title, got, c.Similar)
			}
		})
	}
}

func TestSimilarStoriesCarryEstimateAndLooksLike(t *testing.T) {
	v := loadSimilarVectors(t)
	stories := append(measuredPast(v.Past), Story{Title: "Export the invoices as PDF"})
	got := SimilarStories(stories, len(stories)-1)
	want := Similar{Title: "Export the invoices as CSV", Estimate: "5", LooksLike: "8"}
	if !slices.Contains(got, want) {
		t.Fatalf("similar = %+v, want %+v among them", got, want)
	}
}

func TestSimilarStoriesNeedFiveMeasured(t *testing.T) {
	v := loadSimilarVectors(t)
	stories := append(measuredPast(v.Past[:SimilarFrom-1]), Story{Title: "Export the invoices as PDF"})
	if got := SimilarStories(stories, len(stories)-1); got != nil {
		t.Fatalf("with %d measured stories = %+v, want none", SimilarFrom-1, got)
	}
}

func TestSimilarStoriesLeaveOutUnmeasuredAndItself(t *testing.T) {
	v := loadSimilarVectors(t)
	stories := measuredPast(v.Past)
	stories = append(stories, Story{Title: "Export the invoices as XML", Estimate: "5"})
	got := titles(SimilarStories(stories, 0))
	if slices.Contains(got, "Export the invoices as XML") || slices.Contains(got, stories[0].Title) {
		t.Fatalf("similar = %q: an unmeasured story or the story itself was named", got)
	}
}

func TestSimilarStoriesNameThreeAtMost(t *testing.T) {
	var stories []Story
	for range 6 {
		stories = append(stories, Story{Title: "Export the invoices as CSV", Estimate: "5", Actual: &Actual{Added: 10}})
	}
	stories = append(stories, Story{Title: "Export the invoices as CSV"})
	if got := SimilarStories(stories, len(stories)-1); len(got) != MaxSimilar {
		t.Fatalf("named %d stories, want %d", len(got), MaxSimilar)
	}
}

func TestSimilarStoriesWithNoStoryOnTheTable(t *testing.T) {
	if got := SimilarStories(nil, -1); got != nil {
		t.Fatalf("no story on the table = %+v, want none", got)
	}
}

func TestSimilarShown_HiddenDuringTheVoteWhenTheRoomSaysSo(t *testing.T) {
	v := loadSimilarVectors(t)
	stories := append(measuredPast(v.Past), Story{Title: "Export the invoices as PDF"})
	snap := Snapshot{Stories: stories, Current: len(stories) - 1, State: StateVoting}
	if got := snap.SimilarShown(); len(got) != 2 {
		t.Fatalf("an open room named %d stories, want 2", len(got))
	}
	snap.HideSimilar = true
	if got := snap.SimilarShown(); got != nil {
		t.Fatalf("hidden during the vote, yet named %+v", got)
	}
	snap.State = StateRevealed
	if got := snap.SimilarShown(); len(got) != 2 {
		t.Fatalf("after the reveal named %d stories, want 2", len(got))
	}
}

func TestSetHideSimilar_IsOpenByDefaultAndTheHostsOnceLocked(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	if snap(r).HideSimilar {
		t.Fatal("a new room hides the similar stories")
	}
	r.SetHideSimilar("p2", true)
	if !snap(r).HideSimilar {
		t.Fatal("the setting was not kept")
	}
	r.SetLocked("p1", true)
	r.SetHideSimilar("p2", false)
	if !snap(r).HideSimilar {
		t.Fatal("a guest changed the setting of a locked room")
	}
	r.SetHideSimilar("p1", false)
	if snap(r).HideSimilar {
		t.Fatal("the host could not open them again")
	}
}
