import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Note} from './components/Note';
import {Tag} from "./common/Tag/Tag";
import {changeNoteUtil} from "./utils/change-note-util";

export const App = () => {
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes]  = useState<{id:string, text: string, tags: string[]}[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const changeNote = changeNoteUtil(setText, setTags)

  const addNote = () => {
    setNotes(prevState => [...prevState, {id: v1(), text: text, tags: tags}])
    setText('')
    setTags([])

  }

  const changeActiveFilter = (filter: string) => {
    activeFilters.includes(filter)
      ? setActiveFilters(prevState => prevState.filter(f=>f!==filter))
      : setActiveFilters(prevState => [...prevState, filter])
  }

  useEffect(()=>{
    const allTags: string[] = []
    notes.forEach(note=>{
      note.tags.forEach(tag=>{
        if (allTags.includes(tag)) {
          return
        }
        allTags.push(tag)
      })
    })
    setFilters(allTags)
  },[notes])

  const filteredNotes = notes.filter(note=>{
    if (activeFilters.length) {
      if (note.tags.some(tag=>activeFilters.includes(tag))) return true
    } else {
      return true
    }
  })

  return (
    <div className="App">
      <ul>{filters.map(filter=>(
        <li key={v1()}><button onClick={()=>changeActiveFilter(filter)} style={{backgroundColor: activeFilters.includes(filter) ? 'red' : 'buttonface'}}>{filter}</button></li>
      ))}</ul>
      <ul>
        {filteredNotes.map(n=>{

          const removeNote = () => {
            setNotes(prevState => prevState.filter(el=>el.id!==n.id))
          }

          const editNote = (text: string, tags: string[]) => {
            setNotes(prevState => prevState.map(el=>el.id===n.id ? {...el, text, tags}: el))
          }

          return (
            <Note key={n.id} text={n.text} tags={n.tags} removeNote={removeNote} editNote={editNote} />
          )
        })}
      </ul>
      <hr/>
      <textarea value={text} onChange={changeNote}/>
      <ul>{tags.map((tag)=>(
        <Tag key={v1()} tag={tag}/>
      ))}</ul>
      <button onClick={addNote}>+</button>
    </div>
  );
}


