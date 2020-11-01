import {useEffect, useState} from 'react'
import axios from 'axios'

export default function ImageLoader(pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [moreImages, hasMoreImages] = useState(false)
    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel
        console.log('calling api');
        axios({
            method : 'GET',
            url : 'https://picsum.photos/v2/list?limit=10',
            params : {page: pageNumber},
            cancelToken : new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setTimeout(function(){
                setImages(prevImages => {
                    let imageSet = [...new Set([...prevImages, ...response.data.map(b => b.download_url)])] 
                    console.log(imageSet);
                    return imageSet; 
                })
                setLoading(false);
            },2000)
            hasMoreImages(response.data.length > 0)
            console.log('images from the api', response.data)
            console.log('Page Number', pageNumber);
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel();
    }, [pageNumber])

    //all the state from the hook
    return {loading, error, images, moreImages}
}