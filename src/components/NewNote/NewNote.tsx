import React, {ChangeEvent, FC} from "react";
import {Button, Textarea} from "../../common";
import './NewNote.scss'

type PropsType = {
  text: string
  changeNote: (e: ChangeEvent<HTMLTextAreaElement> | null, text: string | null ) => void
  addNote: () => void
}

export const NewNote:FC<PropsType> = ({text, changeNote, addNote}) => {

  return <div className={'new-note'}>
    <Textarea value={text} onChange={e=>changeNote(e, null)}/>
    <Button callback={addNote}>add note</Button>
  </div>
}