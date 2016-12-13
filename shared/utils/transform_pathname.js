export default function transform_pathname(pathname) {
	var p = pathname.substring("/blog".length, pathname.length)
	var a = p.length
	var lastChar = p.substring(a-1, a)
	if (lastChar == "/") {
		return p.substring(0,a-1)
	} else {
		return p
	}
}

