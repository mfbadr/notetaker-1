'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Find one Note',
    tags:['notes'],
    auth: {
        mode: 'required'
    },
    validate: {
      params: {
        noteId: Joi.number().required()
      }
    },
    handler: function(request, reply){
      Note.findOne(request.auth.credentials, request.params.noteId, function(err, note){
      if(!err){
        reply(note).code(200);
      }else{
        console.log('ERR FROM ROUTE', err);
        reply().code(400);
      }
    });
  }
};
