const formatSeconds = time => {
  const hr = Math.floor(time / 3600)
  let min = Math.floor((time - hr * 3600) / 60)
  let sec = Math.floor(time - hr * 3600 - min * 60)

  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }

  return min + ':' + sec
}

export default formatSeconds
