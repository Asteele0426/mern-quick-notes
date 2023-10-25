import { useState, useEffect, useRef } from 'react';
import * as notesAPI from '../../utilities/notes-api';
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNoteForm, setNewNoteForm] = useState ({name:"", user:""});
  async function getNotes() {
    const notes = await notesAPI.getAll();
    console.log(notes)
    setNotes(notes);
  }
  useEffect(function() {
    
    getNotes();

    // Load cart (a cart is the unpaid order for the logged in user)
    
  }, []);
  const handleChange=(e)=>{
    
  const {name, value} = e.target
    setNewNoteForm(prevState => ({...prevState,[name]:value  
  }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newNote = {}
    const token = localStorage.getItem('token');
    const user = JSON.parse(atob(token.split('.')[1])).user
    newNote.user=user._id
    newNote.name=newNoteForm.name
    console.log(newNote)
    notesAPI.newNote(newNote)
    getNotes()
  }
  return (
   <div>
    {notes.length===0?<div>No Notes Yet</div>:
    <div>{notes.map((note)=>{
      return(
        <div>{note.name}{note.createdAt}</div>
      )
    })}</div>
    }
    <form onSubmit={handleSubmit}>
      <input value={newNoteForm.name} onChange={handleChange} name="name"></input>
      <button>Submit</button>
    </form>
   </div>
  );
}