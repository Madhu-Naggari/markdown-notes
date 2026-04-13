import AppHeader from "../components/layout/AppHeader";
import NoteEditor from "../components/notes/NoteEditor";
import NotePreview from "../components/notes/NotePreview";
import NotesSidebar from "../components/notes/NotesSidebar";

function NotesPage(props) {
  const {
    content,
    loading,
    notes,
    onContentChange,
    onCreateNote,
    onDeleteNote,
    onLogout,
    onSaveNote,
    onSelectNote,
    onThemeToggle,
    onTitleChange,
    saving,
    selectedId,
    theme,
    title,
    user,
  } = props;

  return (
    <div className="app-shell">
      <AppHeader
        actions={
          <button
            className="secondary-button hover-shadow-md"
            onClick={onLogout}
          >
            Logout
          </button>
        }
        description={`Signed in as ${user.name}. Write notes and preview Markdown instantly.`}
        onThemeToggle={onThemeToggle}
        theme={theme}
        title={import.meta.env.VITE_APP_NAME || "Markdown Notes"}
      />

      <main className="layout">
        <NotesSidebar
          loading={loading}
          notes={notes}
          onCreateNote={onCreateNote}
          onSelectNote={onSelectNote}
          selectedId={selectedId}
        />

        <section className="editor-area">
          <NoteEditor
            content={content}
            onContentChange={onContentChange}
            onDeleteNote={onDeleteNote}
            onSaveNote={onSaveNote}
            onTitleChange={onTitleChange}
            saving={saving}
            selectedId={selectedId}
            title={title}
          />
          <NotePreview title={title} content={content} />
        </section>
      </main>
    </div>
  );
}

export default NotesPage;
