const ResumeParser = require('resume-parser')
var fs = require('fs')
var AWS = require('aws-sdk')

var pdfUtil = require('pdf-to-text')
var pdf_path = "test2.pdf"
 
const config = require("./config.json")

AWS.config = new AWS.Config();
AWS.config.accessKeyId = config["accessKey"];
AWS.config.secretAccessKey = config["secretKey"];
AWS.config.region = "us-east-1";

var s3 = new AWS.S3()

const bucket = config['bucket']
const s3path = config['s3path']

var pdf_filename = 'Allen_Lee_Resume.pdf'
var s3key = s3path + pdf_filename

var params = { 
 Bucket: bucket,
 Delimiter: '.pdf',
 Prefix: s3path
}

function get_pdf_from_s3_promise(Bucket, Key) {
	return new Promise(function(resolve, reject) {
		var params = {Bucket, Key}
		var filename = './temp.pdf'
		s3.getObject(params, function(err, data) {
			if (err) {
				reject(err)
			} else {
				var file = fs.createWriteStream(filename)
				var buff = data.Body
				file.write(buff)
				file.end()
				resolve(filename)			
			}
		})
	})
}

function convert_pdf_to_text_promise(pdf_absfile) {
	return new Promise(function(resolve, reject) {
		var option = {from: 0, to: 10}
		var filename = pdf_filename + ".txt"
		pdfUtil.pdfToText(pdf_absfile, option, function(err, data) {
		  	if (err) reject(err)
			fs.writeFile(filename, data, function(err) {
			    if (err) {
			    	reject(err)
			    } else {
			    	resolve(filename)
			    }
			});
		});		
	})
}

function move_text_to_s3_promise(Bucket, Key, txt_file) {
	return new Promise(function(resolve, reject) {
		var Body = fs.createReadStream( txt_file )
		var opts = {
			Bucket,
			Key,
			ContentType: 'text/plain',
			ACL: 'public-read',
			Body
		}
		s3.putObject(opts, function(err, data) {
	 		if (err) {
	 			reject(err)
	 		} else {
	 			resolve({"filename": txt_file, "response": data})
	 		}
	 	})
	})
}

function parse_text_promise(bucket, s3path, filename) {
	return new Promise(function(resolve, reject) {
		var url = `https://s3.amazonaws.com/${bucket}/${s3path}text/` + filename
		console.log(url)
		ResumeParser.parseResumeUrl(url, './output').then(data => {
	    	resolve(data)
		})
		.catch(error => {
			reject(error);
		});
	})
}

function save_parse_to_es(parse_result) {
	return new Promise(function(resolve, reject) {
		// TODO: implement
		var result = {"success": false, "msg": "not implemented yet"}
		resolve(result)
	})
}

function process_file(bucket, s3key) {
	get_pdf_from_s3_promise(bucket, s3key)
		.then(function (local_file) {
			return convert_pdf_to_text_promise(local_file)
		})
		.then(function(txt_file) {
			return move_text_to_s3_promise(bucket, s3path + 'text/' + txt_file, txt_file)
		})
		.then(function(data) {
			var txt_file = data['filename']
			return parse_text_promise(bucket, s3path, txt_file)
		})
		.then(function(parse_result) {
			return save_parse_to_es(parse_result)
		})
		.then(function(result) {
			console.log(result)
		})
		.catch(function(err) {
			console.log("error!")
			console.log(err)
		})

}


/*
s3.listObjects(params, function (err, data) {
 if(err)throw err;
 console.log(data);
 reso
});
*/

process_file(bucket, s3key)


// If exists, delete local files
// Change ACL to private

