import { apiClient } from "../api/client";

export async function getNotes() {
  const response = await apiClient.get("/notes");
  return response.data;
}

export async function createNote(payload) {
  const response = await apiClient.post("/notes", payload);
  return response.data;
}

export async function updateNote(noteId, payload) {
  const response = await apiClient.put(`/notes/${noteId}`, payload);
  return response.data;
}

export async function deleteNote(noteId) {
  const response = await apiClient.delete(`/notes/${noteId}`);
  return response.data;
}

