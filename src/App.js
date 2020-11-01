import React, {useState, useRef, useCallback} from 'react';
import ImageLoader from './ImageLoader'

export default function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    images,
    moreImages,
    loading,
    error
  } = ImageLoader(pageNumber)

const observer = useRef()
const lastImageElementRef = useCallback(node => {
  if(loading) return 
  if(observer.current) observer.current.disconnect()
  observer.current = new IntersectionObserver(entries => {
if(entries[0].isIntersecting && moreImages){
  console.log('We crossed intersection change the page number and call the api');
setPageNumber(prevPageNumber => prevPageNumber + 1)
}
  })
  if(node) observer.current.observe(node)
}, [loading, moreImages])


  return (
    <div className="App">
    {images.map((image, index) => {
        return <div className="img-grid" key={image} ref={lastImageElementRef}>
        <div className="img-wrap">
          <img src={image} loading="lazy" alt={index+"image"}/>
        </div>
    </div> 
    })}
    <div className="loader">{loading}</div>
    <div>{error && 'Error'}</div>
    </div>
  )
}

