'use strict';

var pg = require('../postgres/manager');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    console.log(err, results);
    cb();
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
  /*
  pg.query('select notes.title, notes.created_at, notes.body ' +
      'from notes ' +
      'where notes.id = $1', [noteId], function(err, results){
        console.log(err, results);
        cb(err, results.rows);
      });
  */
};

module.exports = Note;
