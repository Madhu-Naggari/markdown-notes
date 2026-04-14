import { PlusIcon } from "../common/Icons";

function NotesSidebar({
  loading,
  notes,
  onCreateNote,
  onSelectNote,
  selectedId,
}) {
  return (
    <aside className="sidebar shadow-sm">
      <div className="sidebar-header">
        <h2>Your Notes</h2>
        <button
          className="primary-button hover-shadow-md"
          onClick={onCreateNote}
        >
          <PlusIcon />
          <span>New Note</span>
        </button>
      </div>

      {loading ? (
        <p className="empty-text">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="empty-text">No notes yet. Create your first note.</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <button
              key={note.id}
              className={`note-card shadow-sm hover-shadow-md ${
                selectedId === note.id ? "active" : ""
              }`}
              onClick={() => onSelectNote(note)}
            >
              <strong>{note.title || "Untitled Note"}</strong>
              <span>{note.content || "Empty note"}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default NotesSidebar;
