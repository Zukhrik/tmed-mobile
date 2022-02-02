import {useParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';
import {offeringGalleryMount} from '../../Models/offerings-model';

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOfferingGallery() {
    const {offering_id} = useParams()
    const getOfferingGallery = useCallback(() => {
        if (offering_id) {
            offeringGalleryMount({offering_id})
        }
    }, [offering_id])

    const loadMore = useCallback((page) => {
        const data = {
            params: {
                ...initialParams,
                offset: page * 10
            }
        }

        getOfferingGallery(data)
    }, [getOfferingGallery])

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            const data = {
                clear: true,
                params: {
                    ...initialParams,
                }
            }
            getOfferingGallery(data)
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getOfferingGallery])

    return {
        loadMore
    }
}