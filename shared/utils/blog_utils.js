export function extractFolders(blogs) {
	var folders = []
	if (blogs != undefined) {
		for (var i in blogs) {
			var b = blogs[i]
			var pn = b["prettyname"]
			if (pn != undefined) {
				var arr = pn.split("/")
				var level = 0
				if (arr.length >= level+2) {
					var folder = arr[level+1]
					folders.push(folder)
				}
			}
		}
		folders = folders.reduce((a, x) => a.includes(x) ? a : [...a, x], []).sort()
	}
	return folders
}
