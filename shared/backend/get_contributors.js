import axios  from 'axios'

module.exports = {
    // TODO: migrate to use table blog_contributors
    get_contributors: function () {
        console.log("get_contributors")
        const uri = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/dev/blog/contributors/list"
        return axios
            .get(uri)
            .then(function (result) {
                console.log("get_contributors done!")
                const data = result.data;
                var contributors = {}
                for (var datum of data) {
                    var author = datum['author']
                    console.log(author)
                    contributors[author] = datum
                }
                return contributors;
            })
            .catch((err) => {
                console.log("Could not load contributors")
            })
    }
}
