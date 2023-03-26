import React, {ChangeEvent, FC, KeyboardEvent} from "react";
import {Button, Textarea} from "../../common";
import './NewNote.scss'

type PropsType = {
  text: string
  changeNote: (e: ChangeEvent<HTMLTextAreaElement>) => void
  addNote: () => void
}

export const NewNote:FC<PropsType> = ({text, changeNote, addNote}) => {
  const saveTextAreaValue = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      console.log(e)
      addNote()
    }
  }

  return <div className={'new-note'}>
    <Textarea value={text} onChange={changeNote} saveTextAreaValue={saveTextAreaValue}/>
    {/*<ul>{tags.map((tag)=>(*/}
    {/*  <Tag key={v1()} tag={tag}/>*/}
    {/*))}</ul>*/}
    <Button callback={addNote}>add note</Button>
  </div>
}