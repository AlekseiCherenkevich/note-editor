import React, { FC } from "react";
import './Tag.scss'


type Props = {
  tag: string
}

export const Tag: FC<Props> = ({tag}) => {
  return <li className={'tag'} style={{}}>{tag}</li>
}