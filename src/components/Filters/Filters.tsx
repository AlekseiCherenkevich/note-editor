import React, {FC} from "react";
import {v1} from "uuid";
import './Filters.scss'
import {Button} from "../../common";

type PropsType = {
  filters: string[]
  activeFilters: string[]
  changeActiveFilter: (filter: string) => void
}

export const Filters: FC<PropsType> = ({filters, activeFilters, changeActiveFilter}) => {

  const renderedFilters = filters.map(filter=>(
    <li key={v1()}><Button callback={()=>changeActiveFilter(filter)} style={{backgroundColor: activeFilters.includes(filter) ? 'red' : 'inherit'}}>{filter}</Button></li>
  ))

  return <ul className={'filters'}>{renderedFilters}</ul>
}