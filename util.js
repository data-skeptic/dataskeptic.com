import Router from 'next/router'

export const redirect = (destination: string, res?: Object): void => {
  if (res) {
    res.writeHead(302, { Location: destination })
    res.end()
  } else {
    Router.push(destination)
  }
}
