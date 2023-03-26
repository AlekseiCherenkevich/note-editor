import React, {ChangeEvent, FC, KeyboardEvent, ReactElement} from "react";
import './Textarea.scss'

type Props = {
  value?: string
  highlightedText?: ReactElement<any, any> | null
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  saveTextAreaValue: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<Props>  = ({ highlightedText, value, onChange, saveTextAreaValue}) => {

  return <p className={'editableParagraph'} contentEditable={true}>{highlightedText}</p>
    // <textarea value={value} onChange={onChange} onKeyPress={saveTextAreaValue}></textarea>
}