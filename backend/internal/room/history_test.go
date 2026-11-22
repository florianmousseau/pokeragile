package room

import (
	"fmt"
	"testing"
)

func emptyRoom(t *testing.T) *Room {
	t.Helper()
	r := New("team42", nil)
	t.Cleanup(r.Stop)
	r.Join("p1", "Alice", false)
	return r
}

func TestRestore_ReplaysEstimatesAndMeasuresInAReopenedRoom(t *testing.T) {
	first := measuredRoom(t, []string{"3", "5", "8"}, []int{40, 0, 300})
	kept := first.Snapshot().Stories

	reopened := emptyRoom(t)
	if got := reopened.Restore("p1", kept); got != 3 {
		t.Fatalf("restored %d stories, want 3", got)
	}
	snap := reopened.Snapshot()
	for i, want := range kept {
		got := snap.Stories[i]
		if got.Title != want.Title || got.Estimate != want.Estimate {
			t.Errorf("story %d: got %q at %q, want %q at %q", i, got.Title, got.Estimate, want.Title, want.Estimate)
		}
		if (got.Actual == nil) != (want.Actual == nil) || (got.Actual != nil && *got.Actual != *want.Actual) {
			t.Errorf("story %d: measure %+v, want %+v", i, got.Actual, want.Actual)
		}
	}
	if snap.Current != -1 {
		t.Errorf("an estimated story went back on the table: current %d", snap.Current)
	}
}

func TestRestore_TenMeasuredStoriesBringBackTheReferences(t *testing.T) {
	cards := []string{"1", "2", "3", "5", "8", "1", "2", "3", "5", "8"}
	sizes := []int{10, 20, 40, 80, 160, 12, 22, 42, 82, 162}
	kept := measuredRoom(t, cards, sizes).Snapshot().Stories

	reopened := emptyRoom(t)
	reopened.Restore("p1", kept)
	if got := len(reopened.Snapshot().References); got != 5 {
		t.Fatalf("got %d references after the replay, want one per measured card (5)", got)
	}
}

func TestRestore_TheSecondBrowserAddsOnlyWhatIsMissing(t *testing.T) {
	r := emptyRoom(t)
	r.Join("p2", "Bob", false)
	r.Restore("p1", []Story{{Title: "CSV export", Estimate: "3"}})
	got := r.Restore("p2", []Story{{Title: "CSV export", Estimate: "8"}, {Title: "Login", Estimate: "5"}})
	if got != 1 {
		t.Fatalf("restored %d stories, want 1", got)
	}
	stories := r.Snapshot().Stories
	if len(stories) != 2 || stories[0].Estimate != "3" || stories[1].Title != "Login" {
		t.Fatalf("unexpected list: %+v", stories)
	}
}

func TestRestore_DropsWhatTheRoomCannotHold(t *testing.T) {
	r := emptyRoom(t)
	got := r.Restore("p1", []Story{
		{Title: "   ", Estimate: "3"},
		{Title: "no estimate"},
		{Title: "card of another deck", Estimate: "XL"},
		{Title: "bad measure", Estimate: "3", Actual: &Actual{Added: -4}},
		{Title: "  padded  ", Estimate: "5", Actual: &Actual{Files: 2, Added: 30}, LooksLike: "13"},
	})
	if got != 2 {
		t.Fatalf("restored %d stories, want 2", got)
	}
	stories := r.Snapshot().Stories
	if stories[0].Title != "bad measure" || stories[0].Actual != nil {
		t.Errorf("an invalid measure was kept: %+v", stories[0])
	}
	if stories[1].Title != "padded" || stories[1].Actual == nil || stories[1].LooksLike != "" {
		t.Errorf("unexpected story: %+v", stories[1])
	}
}

func TestRestore_StopsAtTheListBound(t *testing.T) {
	r := emptyRoom(t)
	kept := make([]Story, MaxStories+5)
	for i := range kept {
		kept[i] = Story{Title: fmt.Sprintf("story %d", i), Estimate: "3"}
	}
	if got := r.Restore("p1", kept); got != MaxStories {
		t.Fatalf("restored %d stories, want %d", got, MaxStories)
	}
}

func TestRestore_RefusedWithoutASeatInALockedRoomOrAfterAClear(t *testing.T) {
	kept := []Story{{Title: "CSV export", Estimate: "3"}}

	r := emptyRoom(t)
	if got := r.Restore("ghost", kept); got != 0 {
		t.Errorf("a stranger restored %d stories", got)
	}

	r.Join("p2", "Bob", false)
	r.SetLocked("p1", true)
	if got := r.Restore("p2", kept); got != 0 {
		t.Errorf("a locked room took %d stories from a participant", got)
	}
	r.SetLocked("p1", false)

	r.AddStories("p1", "draft")
	r.ClearStories("p1")
	if got := r.Restore("p2", kept); got != 0 {
		t.Errorf("a cleared list took %d stories back", got)
	}
	if !r.Snapshot().Cleared {
		t.Error("the state does not say the list was cleared")
	}
}

func TestAddStories_AfterARestoreTheFirstNewStoryGoesOnTheTable(t *testing.T) {
	r := emptyRoom(t)
	r.Restore("p1", []Story{{Title: "CSV export", Estimate: "3"}, {Title: "Login", Estimate: "5"}})
	r.AddStories("p1", "Search\nFilters")
	snap := r.Snapshot()
	if snap.Current != 2 || snap.Stories[snap.Current].Title != "Search" {
		t.Fatalf("on the table: %d, want the first new story", snap.Current)
	}
}
