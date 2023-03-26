import React, {FC, useRef} from "react";
import {v1} from "uuid";
import {Button, Tag} from "../../../common";
import {useNote} from "../../../hooks";
import { splitText } from "../../../utils";
import './Note.scss'


type Props = {
  text: string
  tags: string[]
  removeNote: () => void
  editNote: (text: string, tags: string[]) => void
}

export const Note: FC<Props> = ({text, tags, removeNote, editNote}) => {

  const {edit, changeNote, saveChanges, cancelChanges, activateEditMode} = useNote(text, tags, editNote)

  const splittedText = splitText(text, tags)

  const highlightedText = Array.isArray(splittedText)
    ? <div>{splittedText.map(el=>{
    if (tags.includes(el)) {
      return <span key={v1()} style={{backgroundColor: 'red'}}>{el}</span>
    } else {
      return <>{el}</>
    }
  })}</div>
    : <>{splittedText}</>

  const renderedTags = tags.map((tag)=>(
    <Tag key={v1()} tag={tag}/>
  ))

  const textRef = useRef<HTMLParagraphElement>(null)

  const handler = () => {
      changeNote(null, textRef.current?.textContent!)
  }

  const isActiveModeLayout = <>
    <p className={'editableParagraph'} contentEditable={true} ref={textRef}
       onInput={handler}
    >{highlightedText}</p>
    <div className={'buttons'}>
      <Button callback={cancelChanges}>cancel</Button>
      <Button callback={saveChanges}>save</Button>
    </div>
  </>

  const isNotActiveModeLayout = <>
    <p className={'note-text'} onDoubleClick={activateEditMode}>{text}</p>
    <div className={'buttons'}>
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