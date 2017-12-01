import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const homeData =
        {
            "latestEpisode": {
                "title": "Azure Databricks",
                "desc": "<p>I sat down with <a href= \"https://people.eecs.berkeley.edu/~alig/\">Ali Ghodsi</a>, CEO and found of Databricks, and <a href= \"https://twitter.com/originaljgc\">John Chirapurath</a>, GM for Data Platform Marketing at Microsoft related to the recent announcement of Azure Databricks.</p> <p>When I heard about the announcement, my first thoughts were two-fold.В  First, the possibility of optimized integrations with existing Azure services.В  This would be a big benefit to heavy Azure users who also want to use Spark.В  Second, the benefits of active directory to control Databricks access for large enterprise.</p> <p>Hear Ali and JG's thoughts and comments on what makes Azure Databricks a novel offering.</p> <p>В </p>",
                "pubDate": "2017-11-28T16:00:00.000Z",
                "mp3": "http://traffic.libsyn.com/dataskeptic/azure-databricks.mp3?dest-id=201630",
                "duration": "28:27",
                "img": "https://static.libsyn.com/p/assets/2/9/3/8/2938570bb173ccbc/DataSkeptic-Podcast-1A.jpg",
                "guid": "1e1711efd17f67e6cd336a1676647fee",
                "link": "https://dataskeptic.com/blog/episodes/2017/azure-databricks",
                "num": 188
            },
            "latestBlog": {
                "rendered": "episodes/2017/quantum-computing.htm",
                "c_hash": "acc4dfa5fd87e60b25a4b2de9ee84d35",
                "date_discovered": "2017-11-25",
                "title": "Quantum Computing",
                "last_rendered": "2017-12-01",
                "author": "Kyle",
                "uri": "dataskeptic.com/episodes/2017/quantum-computing.md",
                "ext": ".md",
                "publish_date": "2017-12-01",
                "env": "master",
                "prettyname": "/episodes/2017/quantum-computing",
                "desc": "Scott Aaronson joins us this week to dispel some myths about quantum computing and share the ways in which a quantum computer has advantages over classical computers.",
                "contributor": {
                    "prettyname": "Kyle Polich",
                    "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                    "twitter": "@dataskeptic",
                    "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                    "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                    "sort-rank": 1
                }
            },
            "latestSponsor": {
                "id":15,
                "name": "Briliant15",
                "url": "http://brilliant.org/dataskeptics",
                "promoText":"some text",
                "img":"/image.jpg",
                "date": "June 12, 2017"
            }}
    res.send(homeData)
})


module.exports = router