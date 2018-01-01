export default function doRefresh(store, env) {
	var db_env = env
	if (db_env == "prod") {
		db_env = "master"
	}
	console.log("Just wasting time in this function because we're not confident enough to delete it...")
}

