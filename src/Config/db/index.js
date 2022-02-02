import {openDB} from 'idb'

export const db = openDB('DWED_DB', 1, {
    upgrade(database, oldVersion, newVersion, transaction) {
        database.createObjectStore('online_accounts')
        database.createObjectStore('image')
        database.createObjectStore('test')
    },
})

export async function idbGet(objectStore, key) {
    return (await db).get(objectStore, key)
}

export async function idbSet(objectStore, key, val) {
    return (await db).put(objectStore, val, key)
}

export async function idbDel(objectStore, key) {
    return (await db).delete(objectStore, key)
}

export async function idbClear(objectStore) {
    return (await db).clear(objectStore)
}

export async function idbKeys(objectStore) {
    return (await db).getAllKeys(objectStore)
}

export async function idbValues(objectStore) {
    return (await db).getAll(objectStore)
}

export async function idbCreateObjectStore(objectStore) {
    return (await db).createObjectStore(objectStore, {autoIncrement: true, keyPath: objectStore})
}

export async function idbDelObjectStore(objectStore) {
    return (await db).deleteObjectStore(objectStore)
}






