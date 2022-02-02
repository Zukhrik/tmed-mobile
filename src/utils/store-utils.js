export const storeListWithKey = ({response, state, key, clear, limit, search}) => {
    const {results: list, ...configs} = response
    const data = {...state.data}
    const result = {...state.result}
    result[key] = result[key]
        ? {...result[key], ...configs, nextOffset: result[key].nextOffset + limit, search}
        : {...configs, nextOffset: limit, search}
    data[key] = clear
        ? list
        : data[key]
            ? [...data[key], ...list]
            : list
    
    return {
        result,
        data
    }
}

export const commonStoreList = ({response, state, clear, limit}) => {
    const {results: list, ...configs} = response
    const result = {
        ...configs,
        nextOffset: clear ? limit : state.result.nextOffset ? state.result.nextOffset + limit : limit
    }
    const data = clear ? list : [...state.data, ...list]
    return {result, data}
}

export const storeWithKey = ({response, state, key}) => {
    const data = {...state.data}
    data[key] = response
    return {
        data
    }
}

export const changeSingleItemInArray = ({arr, key, value, getOldData}) => {
    const idx = arr.findIndex(item => item[key] === value)
    if (idx === -1) {
        return arr
    }
    
    const oldData = arr[idx]
    return [
        ...arr.slice(0, idx),
        {...oldData, ...getOldData(oldData)},
        ...arr.slice(idx + 1)
    ]
}