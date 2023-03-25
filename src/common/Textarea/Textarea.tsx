import {ChangeEvent, FC} from "react";
import './Textarea.scss'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<Props> = ({value, onChange}) => {

  return <textarea value={value} onChange={onChange} />
}