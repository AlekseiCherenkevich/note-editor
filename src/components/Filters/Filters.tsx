import React, {FC} from "react";
import {v1} from "uuid";

type PropsType = {
  filters: string[]
  activeFilters: string[]
  changeActiveFilter: (filter: string) => void
}

export const Filters: FC<PropsType> = ({filters, activeFilters, changeActiveFilter}) => {

  const renderedFilters = filters.map(filter=>(
    <li key={v1()}><button onClick={()=>changeActiveFilter(filter)} style={{backgroundColor: activeFilters.includes(filter) ? 'red' : 'buttonface'}}>{filter}</button></li>
  ))

  return <ul>{renderedFilters}</ul>
}