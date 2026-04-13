function NoteEditor({
  content,
  onContentChange,
  onDeleteNote,
  onSaveNote,
  onTitleChange,
  saving,
  selectedId,
  title,
}) {
  return (
    <div className="editor-panel shadow-sm">
      <div className="panel-header">
        <h2>Editor</h2>
        <div className="action-row">
          <button
            className="secondary-button hover-shadow-md"
            onClick={onSaveNote}
            disabled={!selectedId || saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="danger-button hover-shadow-md"
            onClick={onDeleteNote}
            disabled={!selectedId}
          >
            Delete
          </button>
        </div>
      </div>

      <input
        className="title-input"
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <textarea
        className="content-input"
        placeholder="Write your markdown here..."
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
      />
    </div>
  );
}

export default NoteEditor;

