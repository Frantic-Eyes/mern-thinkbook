import Note from "../models/note.js";

export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error in getNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getNotes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content }); //shorted form of {title:title, content:content}

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ data: deletedNote, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
