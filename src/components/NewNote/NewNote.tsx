import React, {ChangeEvent, FC} from "react";

type PropsType = {
  text: string
  changeNote: (e: ChangeEvent<HTMLTextAreaElement>) => void
  addNote: () => void
}

export const NewNote:FC<PropsType> = ({text, changeNote, addNote}) => {
  return <>
    <textarea value={text} onChange={changeNote}/>
    {/*<ul>{tags.map((tag)=>(*/}
    {/*  <Tag key={v1()} tag={tag}/>*/}
    {/*))}</ul>*/}
    <button onClick={addNote}>+</button>
  </>
}