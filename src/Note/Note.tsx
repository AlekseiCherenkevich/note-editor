import React, {FC, useState} from "react";


type Props = {
  text: string
  removeNote: () => void
  editNote: (text: string) => void
}

export const Note: FC<Props> = ({text, removeNote, editNote}) => {
  const [edit, setEdit] = useState(false)
  const [editedText, setEditedText] = useState(text)

  const activateEditMode = () => setEdit(true)
  const deactivateEditMode = () => setEdit(false)

  const saveChanges = () => {
    editNote(editedText)
    deactivateEditMode()
  }

  const cancelChanges = () => {
    setEditedText(text)
    deactivateEditMode()
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
        <textarea value={editedText} onChange={(e)=>setEditedText(e.currentTarget.value)}/>
        <div style={{display: "flex"}}>
            <button onClick={cancelChanges}>cancel</button>
            <button onClick={saveChanges}>save</button>
        </div>
    </>}
  </li>
}