import {NoteType} from "../../hooks";
import React, {FC} from "react";
import {Container} from "../../common";
import { Note } from "./Note";

type NotesPropsType = {
  filteredNotes: NoteType[]
  setNotes: (prevState: any) => void
}

export const Notes: FC<NotesPropsType> = ({filteredNotes, setNotes}) => {

  const renderedNotes = filteredNotes.map(n=>{
    const removeNote = () => setNotes((prevState: NoteType[]) => prevState.filter(el=>el.id!==n.id))

    const editNote = (text: string, tags: string[]) => setNotes((prevState: NoteType[]) => prevState.map(el=>el.id===n.id ? {...el, text, tags}: el))

    return <Container><Note key={n.id} text={n.text} tags={n.tags} removeNote={removeNote} editNote={editNote} /></Container>
  })

  return <ul>{renderedNotes}</ul>
}