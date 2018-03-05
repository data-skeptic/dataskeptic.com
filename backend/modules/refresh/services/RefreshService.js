export const doRefresh = () => {
  return new Promise((resolve, reject) => {
    return resolve(JSON.stringify({ status: 'ok' }))
  })
}
