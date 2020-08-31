import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Search(pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(false)



    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method : 'GET',
            url : 'https://picsum.photos/v2/list?limit=10',
            params : {page: pageNumber},
            cancelToken : new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setImages(prevBooks => {
                return [...new Set([...prevBooks, ...response.data.map(b => b.download_url)])] 
            })
            setHasMore(response.data.length > 0)
            console.log(response.data)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])


    //all the state from the hook
    return {loading, error, images, hasMore}
}


/* 
fetch('https://picsum.photos/v2/list', {
    method: 'GET',
    "timeout": 0,
  }).then(response => response.json())
  .then(object => {
    const images = object[0];
    console.log(images.url)}) */