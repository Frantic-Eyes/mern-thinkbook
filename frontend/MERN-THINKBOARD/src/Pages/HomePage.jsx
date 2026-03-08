import React, { useEffect, useState } from "react";
import axios from "axios";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error fetching notes";
        showToast(errorMessage, "error");
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and content cannot be empty", "warning");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/notes", {
        title,
        content,
      });
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
      const successMessage = res.data?.message || "Note created successfully";
      showToast(successMessage, "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating note";
      showToast(errorMessage, "error");
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      const successMessage = res.data?.message || "Note deleted successfully";
      showToast(successMessage, "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error deleting note";
      showToast(errorMessage, "error");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      {toast && (
        <div role="alert" className={`alert alert-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center py-1 my-1">
        <div className="card card-border w-96 bg-base-300 card-xl shadow-sm">
          <div className="card-body">
            <input
              type="text"
              className="input"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="input input-xl break-words"
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="justify-end card-actions">
              <button
                className="btn btn-secondary"
                onClick={() => handleCreateNote()}
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          notes.map((note) => {
            return (
              <div className="card card-border w-96 bg-base-300 card-xl shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>
                  <p className="break-words">{note.content}</p>
                  <div className="justify-end card-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDelete(note._id)}
                    >
                      DELETE
                    </button>
                    <button className="btn btn-primary">EDIT</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
