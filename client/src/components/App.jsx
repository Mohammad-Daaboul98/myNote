import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";


function App() {
  const [notes, setNotes] = useState([]);
  // const [id ,setId] = useState();


  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((result)=>{
     
      setNotes(result.data)
    })
  },[AddNote]);

  function AddNote(newNote) {

      Axios.post("http://localhost:3001/api/insert",{
        title:newNote.title,
        content:newNote.content
    }).then("Susccessful insert");
    

    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  function deleteNote(id) {

Axios.delete(`http://localhost:3001/api/delete/${id}`);
    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== Id;
    //   });
    // });
  }

  return (
    <div>
      <Header />
      <CreateArea  onAdd={AddNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id = {noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
