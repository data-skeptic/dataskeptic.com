var related_content_cache = {
  "/blog/episodes/2017/studying-competition-and-gender-through-chess": [
    {
      uri: "/blog/episodes/2014/economic-modeling-and-prediction-charitable-giving-and-a-follow-up-with-peter-backus",
      title: "More with Peter Backus",
      desc: "Peter Backus is a returning guest on Data Skeptic.  Check out our first conversation with him."
    },
    {
      uri: "/blog/episodes/2015/detecting-cheating-in-chess",
      title: "Detecting Cheating in Chess",
      desc: "Kenneth Regan has developed a methodology for looking at a long series of modes and measuring the likelihood that the moves may have been selected by an algorithm."
    }
  ]
}

module.exports = {
  related_content: function(req, res) {
    var resp = []
    var uri = req.query.uri
    console.log(uri)
    if (uri != undefined) {
      resp = related_content_cache[uri]
      if (resp == undefined) {
        resp = []
      }
    }
    return res.status(200).end(JSON.stringify(resp))
  }
}