'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',              config: require('../definitions/static/angular')},
  {method: 'post',   path: '/register',              config: require('../definitions/users/register')},
  {method: 'post',   path: '/login',                 config: require('../definitions/users/login')},
  {method: 'delete', path: '/logout',                config: require('../definitions/users/logout')},
  {method: 'get',    path: '/status',                config: require('../definitions/users/status')},
  {method: 'post',   path: '/notes',                 config: require('../definitions/notes/create')},
  {method: 'get',    path: '/notes',                 config: require('../definitions/notes/list')},
  {method: 'post',   path: '/notes/{noteId}/upload', config: require('../definitions/notes/upload')},
  {method: 'get',    path: '/notes/{noteId}',        config: require('../definitions/notes/one')},
  {method: 'post',   path: '/mobileupload',         config: require('../definitions/notes/mobileupload')},
  {method: 'get',    path: '/notes/count',           config: require('../definitions/notes/count')}
];
