import React, {useState} from 'react';
import './App.css';
import Search from './Search'

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  Search(query, pageNumber)

  function handleSearch(e){
      setQuery(e.target.value)
      setPageNumber(1)
  }

  return (
    <>
    <h1>Infinite scroll React</h1>
    <input type="text" onChange={handleSearch}></input>
    <div>Title</div>
    <div>Title</div>
    <div>Title</div>
    <div>Title</div>
    <div>Title</div>
    <div>Loading...</div>
    <div>Error</div>
    </>
  );
}

