'use strict';

var //Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Listing da notez',
    tags:['notes'],
    auth: {
        mode: 'required'
    },
    handler: function(request, reply){
        Note.list(request.auth.credentials.id, function(err, notes){
           if(!err){reply(notes).code(200);
           }else{reply().code(400);
           }
        });
    }
};
