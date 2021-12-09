const createFetchError = res =>
  new Error(`Failed to fetch(${res.status}): ${res.statusText}`)

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const res = await fetch(url)
  if (!res.ok) throw createFetchError(res)
  return res.arrayBuffer()
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const res = await fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  })
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);

  const res = await fetch(url, {
    method: 'POST',
    body: jsonString,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
