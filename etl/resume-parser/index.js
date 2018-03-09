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

//var pdf_filename = '00a7d5ee.pdf'  
//var s3key = s3path + pdf_filename

var elasticsearch = require('elasticsearch')
var elastic_search_endpoint = config['elastic_search_endpoint']
var client = new elasticsearch.Client({
  host: elastic_search_endpoint,
  log: 'warning'
})

var params = { 
 Bucket: bucket,
 Delimiter: '.pdf',
 Prefix: s3path
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

function get_local_filename_from_s3_key(Key) {
	var filename = Key.replaceAll('/', '_')
	console.log(filename)
	return filename
}

function get_pdf_from_s3_promise(Bucket, Key) {
	return new Promise(function(resolve, reject) {
		var params = {Bucket, Key}
		var filename = get_local_filename_from_s3_key(Key)
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
		var filename = pdf_absfile + ".txt"
		const testFolder = './';
		pdfUtil.pdfToText(pdf_absfile, option, function(err, data) {
			console.log(pdf_absfile)
		  	if (err) reject(err)
		  	console.log('10')
			fs.writeFile(filename, data, function(err) {
			    if (err) {
			    	console.log('12')
			    	reject(err)
			    } else {
			    	console.log(filename)
			    	resolve(filename, pdf_absfile)
			    }
			})
		});		
	})
}

function move_text_to_s3_promise(Bucket, Key, txt_file) {
	return new Promise(function(resolve, reject) {
		console.log('move_text_to_s3_promise!!!')
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
			data['id'] = url
	    	resolve(data)
		})
		.catch(error => {
			reject(error);
		});
	})
}

function save_parse_to_es(parse_result) {
	return new Promise(function(resolve, reject) {
		return client.index({
			index : 'candidates_cv',
			type : 'candidate',
			id : parse_result.id,
			body : {
				name           : parse_result.name,
		        email          : parse_result.email,
		        phone   	   : parse_result.phone,
		        objective      : parse_result.objective,
		        education      : parse_result.education,
		        certification  : parse_result.certification,
		        experience     : parse_result.experience,
		        summary		   : parse_result.summary,
		        profiles       : parse_result.profiles,
		        projects       : parse_result.projects,
		        awards		   : parse_result.awards
            }
        })
		var result = {"success": false, "msg": "not implemented yet"}
		resolve(result)
	})
}



function cleanup(s3key) {
	console.log('function run')
	var filename = get_local_filename_from_s3_key(s3key) 
	console.log('***'+filename)
	if (fs.existsSync(filename)) {
		fs.unlinkSync(filename)
	}
	var filename2 = filename + '.txt'
	console.log('???'+filename2)
	if (fs.existsSync(filename2)) {
		console.log('<<<<<<')
		fs.unlinkSync(filename2)
	}	
}



var p = new Promise(function(resolve, reject) {
	return get_pdf_from_s3_promise(bucket, s3key)
		.then(function (local_file) {
			console.log('get_pdf_from_s3_promise')
			return convert_pdf_to_text_promise(local_file)
		})
		.then(function(txt_file, pdf_absfile) {
			console.log('convert_pdf_to_text_promise')
			return move_text_to_s3_promise(bucket, s3path + 'text/' + txt_file, txt_file)
		})
		.then(function(data) {
			var txt_file = data['filename']
			console.log('move_text_to_s3_promise')
			return parse_text_promise(bucket, s3path, txt_file)
		})
		.then(function(parse_result) {
			console.log('parse_text_promise')
			return save_parse_to_es(parse_result)
		})
		.then(function(result) {
			console.log('save_parse_to_es')
			console.log(result)
			resolve(s3key)
		})
		.catch(function(err) {
			console.log("error!!!")
			console.log(err)
			reject(s3key) 
		})
})








	


p.then(cleanup).catch(cleanup)







//var p = process_file(bucket, 'resumes/unsourced/00a7d5ee.pdf')
/*
p.then(function(s3key){
	console.log('done!!!!!!!')
	cleanup(s3key)
})
.then(function(){
	console.log('done')
})
*/



/*
s3.listObjects(params, function (err, data) {
 if(err)throw err;
 var IsTruncated = data['IsTruncated']
 if (IsTruncated) {
 	console.log('err!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
 }
 var Contents = data['CommonPrefixes'].slice(74,75)
 for (var item of Contents) {
 	var Prefix = item['Prefix']
 	var n = Prefix.length
 	console.log(Prefix)
 	var ext = Prefix.substring(n-3,n).toLowerCase()
 	console.log(ext)
 	if (ext == "pdf") {
 		process_file(bucket, Prefix)
 	}
 }
});
*/

//process_file(bucket, 'resumes/unsourced/ALIREZA_ALIAMIRI.pdf') 

/*
try{

process_file(bucket, 'resumes/unsourced/00a7d5ee.pdf')

}catch(e){

console.log('error');
}


*/

// If exists, delete local files
// Change ACL to private

