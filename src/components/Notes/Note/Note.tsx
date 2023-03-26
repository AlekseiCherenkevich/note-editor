import React, {FC, useRef} from "react";
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

type HashType = {idx: number, tag: string}[]

const highlightText = (text: string, tags: string[]) => {
  const hash: HashType = []
  tags.forEach(tag=>{
    let idx = text.indexOf(tag)
    if (idx > -1) {
      hash.push({idx, tag})
    }
    while (idx > -1) {
      idx = text.indexOf(tag, idx+tag.length)
      if (idx > -1 && text[idx-1] === ' ') {
        hash.push({idx, tag})
      }
    }
  })
  console.log(hash.sort((a,b)=>a.idx-b.idx))
  return hash.sort((a,b)=>a.idx-b.idx)
}

const light = (str: string, hash: HashType) => {
  if (hash.length === 0) return str
  let arr: string[] = []
  let globalIdx = 0
  hash.forEach(el=>{
    if (el.idx === 0) {
      arr.push(el.tag)
      globalIdx = el.idx + el.tag.length
    } else {
      arr.push(str.slice(globalIdx, el.idx))
      arr.push(el.tag)
      globalIdx = el.idx + el.tag.length
    }
  })
  return arr
}




export const Note: FC<Props> = ({text, tags, removeNote, editNote}) => {

  const {edit, editedText, changeNote, saveChanges, cancelChanges, activateEditMode} = useNote(text, tags, editNote)


  const handledText = light(text, highlightText(text, tags))
  const highlightedText = Array.isArray(handledText)
    ? <div>{handledText.map(el=>{
    if (tags.includes(el)) {
      return <span key={v1()} style={{backgroundColor: 'red'}}>{el}</span>
    } else {
      return <>{el}</>
    }
  })}</div>
    : <>{handledText}</>

  const renderedTags = tags.map((tag)=>(
    <Tag key={v1()} tag={tag}/>
  ))

  const textRef = useRef<HTMLParagraphElement>(null)

  const handler = () => {
      changeNote(null, textRef.current?.textContent!)
  }

  const isActiveModeLayout = <>
    {/*<div style={{display: 'none'}}><Textarea value={editedText} onChange={changeNote} saveTextAreaValue={saveTextAreaValue} /></div>*/}
    {/*<Textarea onChange={changeNote} saveTextAreaValue={saveTextAreaValue}/>*/}
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