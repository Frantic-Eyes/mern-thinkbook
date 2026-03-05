import React, { useEffect, useState } from "react";
import axios from "axios";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center py-1 my-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          notes.map((note) => {
            return (
              <div className="card w-96 bg-base-300 card-xl shadow-sm">
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
