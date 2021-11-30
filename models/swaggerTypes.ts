/**
 * @typedef {object} RefreshToken
 * @property {string} accessToken.required - Access token for accessing the private routes of API
 * @property {string} refreshToken.required - Refresh token for update access token
 */

/**
 * @typedef {object} Error
 * @property {string} message - error message
 */

/**
 * @typedef {object} User
 * @property {string} userName.required - Username
 * @property {string} accessToken.required - Access token for accessing the private routes of API
 * @property {string} refreshToken.required - Refresh token for update access token
 */

/**
 * @typedef {object} ListElement
 * @property {string} description.required - Body of list element
 * @property {string} _id.required - ID of list element
 */

/**
 * @typedef {object} GetList
 * @property {array<ListElement>} elements.required - Array of list elements
 */
