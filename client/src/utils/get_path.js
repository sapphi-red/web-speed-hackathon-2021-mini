/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId, small) {
  return `/images/${imageId}${small ? '-2' : ''}.avif`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.webm`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundMetaPath(soundId) {
  return `/sounds/${soundId}.meta.svg`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.avif`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundMetaPath, getProfileImagePath };
