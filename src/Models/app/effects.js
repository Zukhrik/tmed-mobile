import { createEffect } from "effector";
import currencies from '../../Service/app';


export const fetchCurrencies = createEffect({
  handler: currencies.getCurrencies
})

export const fetchDetectLocation = createEffect({
  handler: currencies.detectLocation
})