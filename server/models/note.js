'use strict';

var pg = require('../postgres/manager'),
    AWS = require('aws-sdk'),
    path = require('path'),
    concat = require('concat-stream'),
    //async  = require('async'),
    crypto = require('crypto');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    console.log(err, results);
    cb(err, results && results.rows ? results.rows[0].add_note : null);
  });
};

Note.count = function(user, cb){
  pg.query('select count(*) from notes where user_id = $1', [user.id], function(err, results){
    cb(err, results && results.rows ? results.rows[0].count : null);
  });
};

Note.list = function(userId, query, cb){
  pg.query('select * from query_notes($1, $2, $3, $4)', [userId, query.limit || 10, query.offset || 0, query.tag || '%'], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Note.findOne = function(user, noteId, cb){
  console.log('NOTEID IN MODEL', noteId);
  pg.query('select * from query_note($1, $2)', [user.id, noteId], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Note.upload = function(user, file, name, noteId, cb){
  var s3 = new AWS.S3();

  crypto.randomBytes(48, function(ex, buf){
    var hex = buf.toString('hex'),
        loc = user.token + '/' + noteId + '/' + hex + path.extname(name),
        url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;

    pg.query('insert into photos (url, note_id) values ($1, $2) returning id', [url, noteId], function(err, results){
      if(err){return cb(err);}

      file.pipe(concat(function(buf){
        var params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: buf, ACL: 'public-read'};
        s3.putObject(params, cb);
      }));

    });
  });
};

Note.mobileUpload= function(noteId, b64, user, cb){
  var s3  = new AWS.S3(),
      imgBuf = new Buffer(b64, 'base64');

  crypto.randomBytes(48, function(ex, buf){
    var hex = buf.toString('hex'),
        loc = user.token + '/' + noteId + '/' + hex + '.png',
        url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;

    pg.query('insert into photos (url, note_id) values ($1, $2) returning id', [url, noteId], function(err, results){
      if(err){return cb(err);}

      var params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: imgBuf, ACL: 'public-read'};
      s3.putObject(params, cb);

    });
  });
};

module.exports = Note;
