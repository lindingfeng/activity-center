const project = import.meta.env.VITE_PROJECT_ENV || 'base'

export function getUserInfo (key) {
  const data = window.localStorage.getItem(`${project}_ui`) || '{}'
  try {
    if (key) {
      return JSON.parse(data)[key] || ''
    }
    return JSON.parse(data)
  } catch (error) {
    if (key) {
      return ''
    }
    return {}
  }
}

export function setUserInfo (userInfo = {}) {
  userInfo && window.localStorage.setItem(`${project}_ui`, JSON.stringify(userInfo))
}

export function clearUserInfo () {
  window.localStorage.removeItem(`${project}_ui`)
}
