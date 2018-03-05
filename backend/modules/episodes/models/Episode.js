const Episode = data => ({
  title: data.title,
  desc: data.desc,
  pubDate: data.pubDate,
  mp3: data.mp3,
  duration: data.duration,
  img: data.img,
  guid: data.guid,
  link: data.link,
  num: data.num
})

export default Episode
