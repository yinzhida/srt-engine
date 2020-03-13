/**
 * @file guid.js
 * @module guid
 */

/**
 * Unique ID for an element or function
 * @type {Number}
 */
let __guid = 1;

/**
 * Get a unique auto-incrementing ID by number that has not been returned before.
 *
 * @return {number}
 *         A new unique ID.
 */
const newGUID = function newGUID () {
  return __guid++;
};

const setGUID = function setGUID (uid) {
  __guid = Math.max(__guid, uid);
};

export {
  newGUID,
  setGUID
};
