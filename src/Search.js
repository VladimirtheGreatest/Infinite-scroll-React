import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Search(query, pageNumber) {

    useEffect(() => {
        axios({
            method : 'GET',
            url : 'http://openlibrary.org/search.json',
            params : {q : query, page: pageNumber}
        }).then(response => {
            console.log(response.data)
        })
    }, [query, pageNumber])
    return null
}
