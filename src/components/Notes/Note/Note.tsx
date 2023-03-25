import React, {FC} from "react";
import {v1} from "uuid";
import {Tag} from "../../../common";
import {useNote} from "../../../hooks";


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
      <button onClick={cancelChanges}>cancel</button>
      <button onClick={saveChanges}>save</button>
    </div>
  </>

  const isNotActiveModeLayout = <>
    <p>{text}</p>
    <div style={{display: "flex"}}>
      <button onClick={removeNote}>remove</button>
      <button onClick={activateEditMode}>edit</button>
    </div>
  </>

  return <li style={{display: "flex", flexDirection: "column", alignItems: "center", border: '1px solid black'}}>
    {edit
      ? isActiveModeLayout
      : isNotActiveModeLayout
    }
    <ul>
      {renderedTags}
    </ul>
  </li>
}