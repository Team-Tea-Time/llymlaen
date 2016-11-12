export function extractValidationMessages (responseBody, callback) {
  let key = null

  for (key in responseBody) {
    callback(key, responseBody[key][0])
  }
}
