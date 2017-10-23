var _ = require('lodash');
var AWS = require('aws-sdk');
var sharp = require('sharp');

var upload = function(req,res){
  var s3 = new AWS.S3();
  const {filename, data_uri,filetype} = req.body.file;
  const {name} = req.body;
  var fileloc = {};
  AWS.config.update({
    accessKeyId: '<ASK FOR THIS>',
    secretAccessKey: '<ASK FOR THIS>',
    subregion: 'us-west-2',
  });

  var filekey = `${name || 'default'}/${new Date().getTime()}/${filename}`;
  s3.putObject({
      Bucket: `hallo-test-bucket`,
      Key: filekey,
      Body: Buffer.from(data_uri.replace(/^.*base64,/, ""),'base64'),
      ACL: 'public-read', // your permisions
      ContentEncoding: 'base64',
      ContentType: `${filetype}`
    }, (err,data) => {
      if(!err){
        fileloc = `https://s3-us-west-2.amazonaws.com/hallo-test-bucket/${filekey}`;
        res.send({success: fileloc})
      }else{
        console.log(err)
        res.send({error: true})
      }
    })
}

module.exports = {
  upload
};
