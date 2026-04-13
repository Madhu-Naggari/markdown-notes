const noteService = require("../services/noteService");

async function getNotes(req, res) {
  try {
    const notes = await noteService.getNotesByUserId(req.user.id);
    return res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
}

async function getNote(req, res) {
  try {
    const note = await noteService.getNoteById(req.params.id, req.user.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error.message);
    return res.status(500).json({ message: "Failed to fetch note" });
  }
}

async function createNote(req, res) {
  const { title = "Untitled Note", content = "" } = req.body;

  try {
    const note = await noteService.createNote(req.user.id, { title, content });
    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error.message);
    return res.status(500).json({ message: "Failed to create note" });
  }
}

async function updateNote(req, res) {
  const { title = "Untitled Note", content = "" } = req.body;

  try {
    const note = await noteService.updateNote(req.params.id, req.user.id, {
      title,
      content,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json(note);
  } catch (error) {
    console.error("Error updating note:", error.message);
    return res.status(500).json({ message: "Failed to update note" });
  }
}

async function deleteNote(req, res) {
  try {
    const note = await noteService.deleteNote(req.params.id, req.user.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    return res.status(500).json({ message: "Failed to delete note" });
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

