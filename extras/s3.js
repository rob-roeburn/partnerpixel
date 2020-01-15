var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

let s3 = new AWS.S3({apiVersion: '2006-03-01'});

/* s3.listBuckets(function(err, data) { if (err) { console.log("Error", err); } else { console.log("Success", data.Buckets);} });  */
/* s3.listObjects(bucketParams, function(err, data) { if (err) { console.log("Error", err);  } else { console.log("Success", data); } });  */

//let bucketParams = { Bucket : 'analytics.health-and-parenting.com' };

let bucketParams = { Bucket : process.argv[2] };
let uploadParams = { Bucket : process.argv[2], Key: '', Body: '' };
let fs = require('fs');
let path = require('path');
const dt = new Date();
let file = "datafile_"+dt.toISOString()

let writer = fs.createWriteStream(file);
writer.write('I am a test written at '+dt.toISOString());

let fileStream = fs.createReadStream(file);

uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);

s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});

fs.unlinkSync(file);
