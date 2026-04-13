const { pool } = require("../config/database");

async function getNotesByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC, id DESC",
    [userId],
  );

  return result.rows;
}

async function getNoteById(noteId, userId) {
  const result = await pool.query(
    "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
    [noteId, userId],
  );

  return result.rows[0] || null;
}

async function createNote(userId, { title, content }) {
  const result = await pool.query(
    `INSERT INTO notes (user_id, title, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title.trim() || "Untitled Note", content],
  );

  return result.rows[0];
}

async function updateNote(noteId, userId, { title, content }) {
  const result = await pool.query(
    `UPDATE notes
     SET title = $1,
         content = $2,
         updated_at = NOW()
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title.trim() || "Untitled Note", content, noteId, userId],
  );

  return result.rows[0] || null;
}

async function deleteNote(noteId, userId) {
  const result = await pool.query(
    "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id",
    [noteId, userId],
  );

  return result.rows[0] || null;
}

module.exports = {
  getNotesByUserId,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};

