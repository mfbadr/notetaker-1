'use strict';

var //Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Find one Note',
    tags:['notes'],
    auth: {
        mode: 'required'
    },
    handler: function(request, reply){
      Note.findOne(request.params.noteId, function(err, note){
      if(!err){
        reply(note).code(200);
      }else{
        reply().code(400);
      }
    });
  }
};
