const run = server => {
	const io = require('socket.io')(server);

	console.log(`Waiting for new chat connections`)

	io.on('connection', function(socket){
		console.log('a user connected');
	});
}

if (!module.parent) {
  run()
}

export default run
