import React from 'react';
import './App.scss';
import {useApp} from "./hooks";
import {Filters, NewNote, Notes} from './components';
import {Container} from "./common";

export const App = () => {
  const {filteredNotes, filters, text, activeFilters, addNote, changeActiveFilter, changeNote, setNotes} = useApp()

  return (
    <div className="app">
      <Container>
        <Filters activeFilters={activeFilters} filters={filters} changeActiveFilter={changeActiveFilter}/>
      </Container>
      <Notes filteredNotes={filteredNotes} setNotes={setNotes}/>
      <Container>
        <NewNote text={text} addNote={addNote} changeNote={changeNote}/>
      </Container>

    </div>
  );
}








