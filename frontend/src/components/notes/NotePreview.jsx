import ReactMarkdown from "react-markdown";

function NotePreview({ content }) {
  return (
    <div className="preview-panel shadow-sm">
      <div className="panel-header">
        <h2>Preview</h2>
      </div>

      <div className="markdown-preview">
        {content.trim() ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <p className="empty-text">
            Start typing in the editor to see the preview.
          </p>
        )}
      </div>
    </div>
  );
}

export default NotePreview;
