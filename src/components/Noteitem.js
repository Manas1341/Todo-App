import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContex"

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { DeleteNote } = context
    const { note , updateNote } = props
    
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{background:'#ed49e9'}} >
                <div className="card-body">
                    <h5 className="card-title" style={{textDecoration:"underline"}}>{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{DeleteNote(note._id) ;props.showAlert("Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
