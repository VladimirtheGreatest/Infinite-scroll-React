import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Search(query, pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method : 'GET',
            url : 'http://openlibrary.org/search.json',
            params : {q : query, page: pageNumber},
            cancelToken : new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...response.data.docs.map(b => b.title)])] 
            })
            setHasMore(response.data.docs.length > 0)
            console.log(response.data)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])


    //all the state from the hook
    return {loading, error, books, hasMore}
}
