
/**
 * Flattens an array
 * @param {array} array 
 */
function flatten(array) {
    return JSON.parse('[' + JSON.stringify(array).replace(/\[|]/g,'') + ']');
}

export { flatten };