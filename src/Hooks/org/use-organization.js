import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {orgInfoMount} from '../../Models/org-model';

export function useOrganization() {
    const {organization} = useParams()

    useEffect(() => {
        if (organization) {
            orgInfoMount(organization)
        }
    }, [organization])
}