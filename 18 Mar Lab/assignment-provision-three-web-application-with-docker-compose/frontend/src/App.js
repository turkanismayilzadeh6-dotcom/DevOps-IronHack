import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/notes`);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/notes`, formData);
      setNotes([response.data, ...notes]);
      setFormData({ title: '', content: '' });
      setSuccess('Note created successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to create note');
      console.error('Error creating note:', err);
    }
  };

  // Update a note
  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/notes/${editingNote.id}`, formData);
      setNotes(notes.map(note => note.id === editingNote.id ? response.data : note));
      setEditingNote(null);
      setFormData({ title: '', content: '' });
      setSuccess('Note updated successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to update note');
      console.error('Error updating note:', err);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`${API_BASE_URL}/notes/${id}`);
        setNotes(notes.filter(note => note.id !== id));
        setSuccess('Note deleted successfully!');
        setError(null);
      } catch (err) {
        setError('Failed to delete note');
        console.error('Error deleting note:', err);
      }
    }
  };

  // Start editing a note
  const startEditing = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content || ''
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '' });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Notes App</h1>
        <p>Create, edit, and manage your notes</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="form-container">
        <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
        <form onSubmit={editingNote ? updateNote : createNote}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter note content"
            />
          </div>
          <div className="note-actions">
            <button type="submit" className="btn btn-primary">
              {editingNote ? 'Update Note' : 'Create Note'}
            </button>
            {editingNote && (
              <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet. Create your first note above!</p>
        </div>
      ) : (
        <div className="notes-container">
          {notes.map(note => (
            <div key={note.id} className="note-card">
              <h3 className="note-title">{note.title}</h3>
              {note.content && <p className="note-content">{note.content}</p>}
              <p className="note-date">
                Created: {formatDate(note.created_at)}
                {note.updated_at !== note.created_at && (
                  <span> • Updated: {formatDate(note.updated_at)}</span>
                )}
              </p>
              <div className="note-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => startEditing(note)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
