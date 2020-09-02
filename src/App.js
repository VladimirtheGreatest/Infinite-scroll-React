import React, {useState, useRef, useCallback} from 'react';
import Search from './Search'
import { motion } from 'framer-motion';

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
        return <div className="img-grid" key={image} ref={lastImageElementRef}>
        <motion.div className="img-wrap" 
          layout
          whileHover={{ opacity: 1 }}s
        >
          <motion.img src={image} alt="uploaded image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
    </div>
      } else {
        return  <div className="img-grid" key={image}>
        <motion.div className="img-wrap"
          layout
          whileHover={{ opacity: 1 }}s
        >
          <motion.img src={image} alt="uploaded image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
    </div>
      }
    })}
    <div>{loading && 'Loading...'}</div>
    <div>{error && 'Error'}</div>
    </div>
  )
}

