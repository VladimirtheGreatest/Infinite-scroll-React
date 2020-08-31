import React, {useState, useRef, useCallback} from 'react';
import Search from './Search'

export default function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    hasMore,
    loading,
    error
  } = Search(pageNumber)

const observer = useRef()
const lastImageElementRef = useCallback(node => {
  if(loading) return 
  if(observer.current) observer.current.disconnect()
  observer.current = new IntersectionObserver(entries => {
if(entries[0].isIntersecting && hasMore){
setPageNumber(prevPageNumber => prevPageNumber + 1)
}
  })
  if(node) observer.current.observe(node)
}, [loading, hasMore])


  return (
    <div className="App">
    {images.map((image, index) => {
      if(images.length === index + 1){
        return <img className="photo" ref={lastImageElementRef} key={image} src={image}/>
      } else {
        return  <img className="photo" key={image} src={image}/>
      }
    })}
    <div>{loading && 'Loading...'}</div>
    <div>{error && 'Error'}</div>
    </div>
  )
}

