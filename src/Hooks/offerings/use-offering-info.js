import {useParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';
import {offeringInfoMount} from '../../Models/offerings-model';

export function useOfferingInfo() {
    const {offering_id, organization} = useParams()

    const getOfferingInfo = useCallback(() => {
        if (organization) {
            offeringInfoMount({organization, offering_id})
        }
    }, [organization, offering_id])

    useEffect(() => {
        getOfferingInfo()
    }, [getOfferingInfo])
}