import React, {FC} from "react";
import {v1} from "uuid";
import {Button, Tag} from "../../../common";
import {useNote} from "../../../hooks";
import './Note.scss'


type Props = {
  text: string
  tags: string[]
  removeNote: () => void
  editNote: (text: string, tags: string[]) => void
}

export const Note: FC<Props> = ({text, tags, removeNote, editNote}) => {

  const {edit, editedText, changeNote, saveChanges, cancelChanges, activateEditMode} = useNote(text, tags, editNote)

  const renderedTags = tags.map((tag)=>(
    <Tag key={v1()} tag={tag}/>
  ))

  const isActiveModeLayout = <>
    <textarea value={editedText} onChange={changeNote}/>
    <div style={{display: "flex"}}>
      <Button callback={cancelChanges}>cancel</Button>
      <Button callback={saveChanges}>save</Button>
    </div>
  </>

  const isNotActiveModeLayout = <>
    <p className={'note-text'}>{text}</p>
    <div style={{display: "flex"}}>
      <Button callback={removeNote}>remove</Button>
      <Button callback={activateEditMode}>edit</Button>
    </div>
  </>

  return <li>
    {edit
      ? isActiveModeLayout
      : isNotActiveModeLayout
    }
    <ul className={'tags'}>
      {renderedTags}
    </ul>
  </li>
}