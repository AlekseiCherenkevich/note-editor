import {useEffect, useState} from "react";
import {changeText} from "../utils";
import {v1} from "uuid";

export type NoteType = {id:string, text: string, tags: string[]}


const getLocalStorageData = () => {
  const data = localStorage.getItem('notes')
  return data ? JSON.parse(data) : {notes: [], filters: []}
}

export const useApp = () => {
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes]  = useState<NoteType[]>(getLocalStorageData().notes)
  const [filters, setFilters] = useState<string[]>(getLocalStorageData().filters)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const changeNote = changeText(setText, setTags)

  const addNote = () => {
    console.log('text ', text)
    const newNote = {id: v1(), text: text, tags: tags}
    if (text.trim().length > 0) {
      setNotes(prevState => [...prevState, newNote])
      setText('')
      setTags([])
    }
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
    localStorage.setItem('notes', JSON.stringify({notes, filters}))
  },[notes])

  const filteredNotes = notes.filter(note=>{
    if (activeFilters.length) {
      if (note.tags.some(tag=>activeFilters.includes(tag))) return true
    } else {
      return true
    }
  })

  return {filteredNotes, filters, text, activeFilters, changeNote, setText, addNote, changeActiveFilter, setNotes}
}