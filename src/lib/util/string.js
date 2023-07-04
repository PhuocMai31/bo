/**
 *
 * @param value {String}
 * @returns {String}
 */
export const removeSpecialCharacter = (value) => {
  return value.replace(/[^a-zA-Z0-9 ]/g, "");
};
