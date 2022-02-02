export const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const generateSkeleton = (len, min = 30, max = 80) => {
    const data = []
    for (let i = 0; i < len; i++) {
        data.push(getRandom(min, max))
    }
    return data
}