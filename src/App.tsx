import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import { Note } from './Note';

function App() {
  const [text, setText] = useState('')
  const [notes, setNotes]  = useState<{id:string, text: string}[]>([])

  const changeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  }

  const addNote = () => {
    setNotes(prevState => [...prevState, {id: v1(), text: text}])
    setText('')
  }





  return (
    <div className="App">
      <ul>
        {notes.map(n=>{

          const removeNote = () => {
            setNotes(prevState => prevState.filter(el=>el.id!==n.id))
          }

          const editNote = (text: string) => {
            setNotes(prevState => prevState.map(el=>el.id===n.id ? {...el, text}: el))
          }

          return (
            <Note key={n.id} text={n.text} removeNote={removeNote} editNote={editNote} />
          )
        })}
      </ul>
      <hr/>
      <textarea value={text} onChange={changeNote}/>
      <button onClick={addNote}>+</button>
    </div>
  );
}



export default App;
