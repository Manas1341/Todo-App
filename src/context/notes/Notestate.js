import { useState } from "react";
import NoteContext from "./noteContex";

const NoteState = (props) => {
  const BASE_URL = 'https://m-books.onrender.com';
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getnotes = async () => {

    const response = await fetch(`${BASE_URL}/api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
    
  }

  // Add a note
  const Addnote = async (title, description, tag) => {

    const response = await fetch(`${BASE_URL}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note =  await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const DeleteNote =  async (id) => {
    const response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const EditNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`${BASE_URL}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, Addnote, DeleteNote, EditNote , getnotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState