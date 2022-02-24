export const getIntByRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  
  export const getInt = (max) => {
    return getIntByRange(0, max)
  }
  
  export const getFloat = (max) => {
    return Math.random() * (max - .01)
  }
  
  export const percent = (num) => {
    return getInt(100) < num
  }
  
  export const array = array => {
    return array[getInt(array.length)]
  }
  
  export function one() {
    return Math.random() > 0.5 ? 1 : -1
  }
  
  export function getNum (length, num) {
    let arr = []
    do {
        let n = Math.floor(Math.random() * length)
        if (arr.indexOf(n) === -1) {
            arr.push(n)
        }
    } while (arr.length != num);
  
    return arr
  }
  export  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
  
  
  
  export default {
    one,
    getIntByRange,
    getInt,
    percent,
    getFloat,
    array,
    getNum,
    getRandomArrayElements
  }
  