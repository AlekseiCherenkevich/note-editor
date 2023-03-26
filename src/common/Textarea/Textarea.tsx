import React, {ChangeEvent, FC, ReactElement} from "react";
import './Textarea.scss'

type Props = {
  value?: string
  highlightedText?: ReactElement<any, any> | null
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<Props>  = ({ value, onChange}) => {

  return <textarea value={value} onChange={onChange}></textarea>
}