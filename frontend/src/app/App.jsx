import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppToast from "../components/common/AppToast";
import LoadingScreen from "../components/common/LoadingScreen";
import AuthPage from "../pages/AuthPage";
import NotesPage from "../pages/NotesPage";
import {
  clearAuthToken,
  loadStoredAuthToken,
  storeAuthToken,
} from "../services/api/client";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth/authService";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/notes/noteService";
import { getErrorMessage } from "../utils/error";
import { applyTheme, getStartingTheme } from "../utils/theme";

const appName = import.meta.env.VITE_APP_NAME || "Markdown Notes";

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState(getStartingTheme);
  const [appLoading, setAppLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = appName;
  }, []);

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotesForUser();
    } else {
      setNotes([]);
      setSelectedId(null);
      setTitle("");
      setContent("");
      setNotesLoading(false);
    }
  }, [user]);

  async function restoreSession() {
    try {
      loadStoredAuthToken();
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      clearAuthToken();
    } finally {
      setAppLoading(false);
    }
  }

  async function fetchNotesForUser() {
    try {
      setNotesLoading(true);
      const allNotes = await getNotes();
      setNotes(allNotes);

      if (allNotes.length > 0) {
        selectNote(allNotes[0]);
      } else {
        setSelectedId(null);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load notes."));
    } finally {
      setNotesLoading(false);
    }
  }

  function selectNote(note) {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  function handleAuthInputChange(event) {
    const { name, value } = event.target;

    setAuthForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthLoading(true);

    try {
      const response =
        authMode === "login"
          ? await loginUser({
              email: authForm.email,
              password: authForm.password,
            })
          : await registerUser(authForm);

      storeAuthToken(response.token);
      setUser(response.user);
      setAuthForm({
        name: "",
        email: "",
        password: "",
      });
      toast.success(response.message);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          authMode === "login"
            ? "Could not log in."
            : "Could not create account.",
        ),
      );
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
    } finally {
      clearAuthToken();
      setUser(null);
      toast.success("Logged out successfully.");
    }
  }

  async function handleCreateNote() {
    try {
      const newNote = await createNote({
        title: "Untitled Note",
        content: "",
      });

      setNotes((currentNotes) => [newNote, ...currentNotes]);
      selectNote(newNote);
      toast.success("New note created.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create note."));
    }
  }

  async function handleSaveNote() {
    if (!selectedId) {
      toast.error("Create a note first.");
      return;
    }

    try {
      setSaving(true);
      const updatedNote = await updateNote(selectedId, {
        title,
        content,
      });

      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      );

      updatedNotes.sort(
        (first, second) =>
          new Date(second.updated_at).getTime() -
          new Date(first.updated_at).getTime(),
      );

      setNotes(updatedNotes);
      setTitle(updatedNote.title);
      setContent(updatedNote.content);
      toast.success("Note updated successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save note."));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteNote() {
    if (!selectedId) {
      return;
    }

    const shouldDelete = window.confirm("Delete this note?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteNote(selectedId);

      const remainingNotes = notes.filter((note) => note.id !== selectedId);
      setNotes(remainingNotes);

      if (remainingNotes.length > 0) {
        selectNote(remainingNotes[0]);
      } else {
        setSelectedId(null);
        setTitle("");
        setContent("");
      }

      toast.success("Note deleted successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete note."));
    }
  }

  if (appLoading) {
    return (
      <>
        <LoadingScreen />
        <AppToast theme={theme} />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage
          appName={appName}
          authForm={authForm}
          authLoading={authLoading}
          authMode={authMode}
          onAuthInputChange={handleAuthInputChange}
          onAuthModeChange={setAuthMode}
          onSubmit={handleAuthSubmit}
          onThemeToggle={() =>
            setTheme((currentTheme) =>
              currentTheme === "light" ? "dark" : "light",
            )
          }
          theme={theme}
        />
        <AppToast theme={theme} />
      </>
    );
  }

  return (
    <>
      <NotesPage
        content={content}
        loading={notesLoading}
        notes={notes}
        onContentChange={setContent}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        onLogout={handleLogout}
        onSaveNote={handleSaveNote}
        onSelectNote={selectNote}
        onThemeToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
          )
        }
        onTitleChange={setTitle}
        saving={saving}
        selectedId={selectedId}
        theme={theme}
        title={title}
        user={user}
      />
      <AppToast theme={theme} />
    </>
  );
}

export default App;
