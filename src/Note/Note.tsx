import React, {ChangeEvent, FC, useState} from "react";
import { v1 } from "uuid";
import {Tag} from "../common/Tag/Tag";


type Props = {
  text: string
  tags: string[]
  removeNote: () => void
  editNote: (text: string, tags: string[]) => void
}

export const Note: FC<Props> = ({text, tags, removeNote, editNote}) => {
  const [edit, setEdit] = useState(false)
  const [editedText, setEditedText] = useState(text)
  const [editedTags, setEditedTags] = useState(tags)

  const activateEditMode = () => setEdit(true)
  const deactivateEditMode = () => setEdit(false)

  const saveChanges = () => {
    editNote(editedText, editedTags)
    deactivateEditMode()
  }

  const cancelChanges = () => {
    setEditedText(text)
    deactivateEditMode()
  }

  const changeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value
    let tags: string[] = []
    setEditedText(text)
    if (text.at(-1) !== '') {
      const splittedStr = text.split(' ')
      splittedStr.forEach(word=>{
        word.trim()
        if (word[0] === '#' && !tags.includes(word)) {
          tags.push(word)
          setEditedTags(tags)
        }
      })
    }
    if (!text.includes('#')) {
      setEditedTags([])
    }
  }

  return <li style={{display: "flex", flexDirection: "column", alignItems: "center", border: '1px solid black'}}>

    {!edit && <>
        <p>{text}</p>
        <div style={{display: "flex"}}>
            <button onClick={removeNote}>remove</button>
            <button onClick={activateEditMode}>edit</button>
        </div>
    </>}

    {edit && <>
        <textarea value={editedText} onChange={changeNote}/>
        <div style={{display: "flex"}}>
            <button onClick={cancelChanges}>cancel</button>
            <button onClick={saveChanges}>save</button>
        </div>
    </>}
    {editedTags.map((tag)=>(
      <Tag key={v1()} tag={tag}/>
    ))}
  </li>
}