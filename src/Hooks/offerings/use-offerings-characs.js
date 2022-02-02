import {useParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';
import {offeringsCharacsMount} from '../../Models/offerings-model';

export function useOfferingsCharacs() {
   const {offering_id} = useParams()

   const getOfferingsCharacs = useCallback(() => {
      if(offering_id){
         offeringsCharacsMount({offering_id})
      }
   }, [offering_id])

   useEffect(() => {
         getOfferingsCharacs()
   }, [getOfferingsCharacs])
}