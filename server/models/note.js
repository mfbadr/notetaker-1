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

Note.list = function(userID, cb){
  pg.query('select notes.title, notes.created_at, notes.id ' +
  'from notes ' +
  'inner join users on notes.user_id=users.id ' +
  'where notes.user_id= $1;', [userID], function(err, results){
    console.log(err, results);
    cb(err, results.rows);
  });
};

Note.findOne = function(noteId, cb){
  console.log('NOTEID IN MODEL', noteId);
  pg.query('select notes.title, notes.created_at, notes.body ' +
      'from notes ' +
      'where notes.id = $1', [noteId], function(err, results){
        console.log(err, results);
        cb(err, results.rows);
      });
};

module.exports = Note;
