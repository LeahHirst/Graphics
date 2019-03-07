/**
 * In this file, the Float32Array type is extended to add shorthand
 * property accessors. Getters and setters are added for all
 * permutations of 'xyzw' and 'rgba'. This allows for modification
 * of Float32Arrays in the following ways:
 * 
 * ```
 * let array = new Float32Array();
 * array.x = 1;
 * array.yz = [ 2, 3 ];
 * array.xyz; // returns [ 1, 2, 3 ];
 * array.y; // returns 2;
 * ```
 */

const letterCombinations = [ 'xyzw', 'rgba' ];

/**
 * Maps a character to an index of an array
 */
const mapping = {
    x: 0,
    y: 1,
    z: 2,
    w: 3,
    r: 0,
    g: 1,
    b: 2,
    a: 3
}

/**
 * Adds a property to the array prototype
 * @param {string} propertyName 
 */
function addProp(propertyName) {
    let letters = propertyName.split('');
    letters = letters.map(letter => {
        return mapping[letter] || 0;
    });

    if (propertyName.length == 1) {
        Object.defineProperty(Float32Array.prototype, propertyName, {
            get: function() {
                return this[letters[0]];
            },
            set: function(v) {
                this[letters[0]] = v;
            }
        });
    } else {
        Object.defineProperty(Float32Array.prototype, propertyName, {
            get: function() {
                return letters.map(l => {
                    this[l];
                })
            },
            set: function(v) {
                letters.forEach(l => {
                    this[l] = v[l];
                });
            }
        });
    }
    
}

function getPermutations(string, prefix = "", permutations = []) {
    let n = string.length;
    if (n == 0) permutations.push(prefix);
    else {
        if (prefix.length > 0)
            permutations.push(prefix);
        for (let i = 0; i < n; i++)
            getPermutations(string.substr(0, i) + string.substr(i+1), prefix + string.charAt(i), permutations)
    }
    return permutations;
}

function addProperties(letters) {
    getPermutations(letters).forEach(x => {
        addProp(x);
    });
}

letterCombinations.forEach(x => {
    addProperties(x);
});