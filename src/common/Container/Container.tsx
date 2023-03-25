import React, {FC, ReactNode} from "react";
import './Container.scss'

type PropsType = {
  children: ReactNode
}

export const Container:FC<PropsType> = ({children}) => {
  return <div className={'container'}>{children}</div>
}