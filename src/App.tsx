import React from 'react';
import './App.css';
import {useApp} from "./hooks";
import {Filters} from './components/Filters';
import {Notes} from './components/Notes';
import {NewNote} from "./components/NewNote";

export const App = () => {
  const {filteredNotes, filters, text, activeFilters, addNote, changeActiveFilter, changeNote, setNotes} = useApp()

  return (
    <div className="App">
      <Filters activeFilters={activeFilters} filters={filters} changeActiveFilter={changeActiveFilter}/>
      <Notes filteredNotes={filteredNotes} setNotes={setNotes}/>
      <hr/>
      <NewNote text={text} addNote={addNote} changeNote={changeNote}/>
    </div>
  );
}






