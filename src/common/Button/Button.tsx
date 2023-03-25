import {FC, ReactNode} from "react"
import './Button.scss'


type Props = {
  children: ReactNode
  style?: object
  callback: () => void
}

export const Button:FC<Props> = ({children, callback, style}) => {

  return <button style={style} className={'button'} onClick={callback}>{children}</button>
}