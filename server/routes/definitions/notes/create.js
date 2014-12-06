'use strict';

var //Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Create a Note',
  tags:['notes'],
  payload: {
    maxBytes: 500000000,
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
  },
  /*
  validate: {
    payload: {
      title: Joi.string().required(),
      body: Joi.string().required(),
      tags: Joi.string().required()
    }
  },
  */
  handler: function(request, reply){
    console.log('CREATE NOTE FROM ROUTE HANDLER', request.payload);
    Note.create(request.auth.credentials, request.payload, function(err, note){
      reply().code(note ? 200 : 400);
    });
  }
};
