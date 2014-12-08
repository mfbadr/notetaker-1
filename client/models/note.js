/* jshint loopfunc: true, camelcase:false */

(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', '$rootScope', '$upload', function($http, $rootScope, $upload){

    function create(note){
      return $http.post('/notes', note);
    }

    function list(){
      return $http.get('/notes?limit=10&offset=0');
    }

    function findOne(noteId){
      return $http.get('/notes/' + noteId);
    }

    function upload(noteId, files){
      var count = 0;
      for (var i =0; i < files.length; i++){
        var file = files[i];
        $upload.upload({
          url: '/notes/' + noteId + '/upload',
          method: 'POST',
          file: file
        }).success(function(data, status, headers, config){
          count++;
          $rootScope.$broadcast('upload', count);
        }).error(function(){
          console.log('An error occured during file upload');
        });
      }
    }

    return {create:create, list:list, findOne:findOne, upload:upload};
  }]);
})();
