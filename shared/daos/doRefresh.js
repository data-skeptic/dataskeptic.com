import axios from "axios"

import { extractFolders } from '../utils/blog_utils'
import getBlogContent from './getBlogContent'

export default function doRefresh(store, env) {
	var db_env = env
	if (db_env == "prod") {
		db_env = "master"
	}
	console.log("Checking for new content since page load...")

}

