'use strict';

var //Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Listing da notez',
    tags:['notes'],
    auth: 'required',
    handler: function(request, reply){
        Note.list(request.auth.credentials.id, function(err, notes){
           reply();
        });
    }
};
