import {useEffect, useState} from "react";
import {changeNoteUtil} from "../utils";
import {v1} from "uuid";

export type NoteType = {id:string, text: string, tags: string[]}

export const useApp = () => {
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes]  = useState<NoteType[]>([])
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

  return {filteredNotes, filters, text, activeFilters, changeNote, addNote, changeActiveFilter, setNotes}
}