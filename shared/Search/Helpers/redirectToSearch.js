const redirectToSearch = (query, hard = true) => {
  query = encodeURIComponent(query)
  if (hard) {
    return window.location.replace(`/search/?q=${query}`)
  } else {
    return window.history.pushState(null, null, `/search?q=${query}`)
  }
}

export default redirectToSearch
