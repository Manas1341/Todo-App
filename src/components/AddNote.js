import React ,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContex"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { Addnote } = context

    const [note , setNote] = useState({title:"" , description:"" , tag:""})

    const handleclick = (e)=>{
        e.preventDefault()
        Addnote(note.title , note.description , note.tag)
        setNote({title:"" , description:"" , tag:""})
        props.showAlert("Created note successfully","success")
    }
    const onchange = (e) =>{
        setNote({...note , [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} value={note.tag} minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
