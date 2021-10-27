// Configure all URL endpoints here
let API_URL = 'https://api.bestveganburger.com'
let COLLECTION = 'bestveganburger'
if (process.env.NODE_ENV === 'development') {
  API_URL = 'https://api-staging.veganlogin.com'
  COLLECTION = 'asdfadsfdsfdffd'
}

export { API_URL, COLLECTION }
