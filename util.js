import Router from 'next/router'

export const redirect = (destination, res) => {
  if (res) {
    res.writeHead(302, { Location: destination })
    res.end()
  } else {
    Router.push(destination)
  }
}
