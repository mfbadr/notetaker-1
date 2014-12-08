'use strict';

var pg = require('../postgres/manager');
    //AWS = require('aws-sdk'),
    //path = require('path'),
    //async  = require('async'),
    //crypto = require('crypto');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    console.log(err, results);
    cb(err, results && results.rows ? results.rows[0].add_note : null);
  });
};

Note.list = function(userId, query, cb){
  pg.query('select * from query_notes($1, $2, $3)', [userId, query.limit, query.offset], function(err, results){
    //console.log(err, results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Note.findOne = function(noteId, cb){
  console.log('NOTEID IN MODEL', noteId);
  pg.query('select * from query_note($1)', [noteId], function(err, results){
    //console.log(err, results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

/*
function savePhotosToS3(photo, cb){
  var s3   = new AWS.S3(),
    params = {Bucket: process.env.AWS_BUCKET, Key: photo.key, Body: photo.body, ACL: 'public-read'};
  s3.putObject(params, cb);
}

function makePhotoUrls(photo, cb){
  var ext  = path.extname(photo.hapi.filename);

  crypto.randomBytes(48, function(ex, buf){
    var token = buf.toString('hex'),
        key       = token + '.img' + ext,
        url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + key;
    cb(null, {key:key, url:url, body:photo._data});
  });
}
*/
module.exports = Note;
