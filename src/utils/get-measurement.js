import {UNITS_OF_MEASUREMENT} from '../data'

export const getMeasurement = (id, field) => {
    const data = UNITS_OF_MEASUREMENT.find(item => item.id === id)
    return field ? data[field] : data
}

