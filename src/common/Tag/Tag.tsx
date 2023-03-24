import React, { FC } from "react";


type Props = {
  tag: string
}

export const Tag: FC<Props> = ({tag}) => {
  return <li style={{backgroundColor: 'red', display: 'block', width: 'fit-content'}}>{tag}</li>
}