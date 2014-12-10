'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Upload a Photo from mobile',
  tags:['notes'],
  validate: {
    payload: {
      noteId: Joi.number().required(),
      b64: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Note.mobileUpload(request.payload.noteId, request.payload.b64, request.auth.credentials, function(err){
      if(err){
        console.log('MOBILE UPLOAD ERROR', err);
      }
      reply().code(err ? 400 : 200);
    });
  }
};
