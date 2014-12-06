(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function list(){
      return $http.get('/notes');
    }

    function findOne(noteId){
      return $http.get('/notes/' + noteId);
    }

    return {create:create, list:list, findOne:findOne};
  }]);
})();
