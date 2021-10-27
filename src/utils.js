const GOOGLE_API_KEY = 'AIzaSyDkEiHce6_l9QzcbLttDkgN2_KxF9KWi_Q'

// Function used to generate a correct link path
// It's useful when different locales are used in URL
function getLinkPath (path, route) {
  let languages = ['pl', 'en']
  let urlParams = window.location.search
  if (typeof route.params.language !== 'undefined' && languages.includes(route.params.language)) {
    return '/' + route.params.language + '/' + path + urlParams
  } else {
    return '/' + path + urlParams
  }
}

let Utils = {
  GOOGLE_API_KEY, getLinkPath
}

export default Utils
