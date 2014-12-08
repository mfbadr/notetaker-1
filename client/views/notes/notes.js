(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', '$upload', function($rootScope, $scope, $state, Note, $stateParams, $upload){
    $scope.note = {};
    $scope.mode = $state.current.name;
    var files;

    $scope.fileSelected = function(f){
      files = f;
    };

    if($scope.mode !== 'viewNote'){
      Note.list().then(function(response){
        $scope.notes = response.data;
      });
    }

    if($scope.mode === 'viewNote'){
      var noteId = $stateParams.noteId;
      console.log('NOTEID is', noteId);
      Note.findOne(noteId).then(function(response){
        $scope.note = response.data[0];
      }, function(response){
        //reject promise
        console.log('promise rejected', response);
      });
    }

    $scope.create = function(note){
      $scope.count = 0;
      Note.create(note).then(function(response){
        debugger;
        $scope.note = {};
        Note.upload(response.data.noteId, $scope.files);
      });
    };

    /* OLD CREATE FUNCTION
    $scope.create = function(){
      $scope.upload = $upload.upload({
        url: 'notes',
        method: 'POST',
        data: $scope.newNote,
        file: files
      }).progress(function(evt){
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config){
        console.log('data', data);
        console.log('status', status);
        console.log('headers', headers);
        console.log('config', config);

        Note.list().then(function(response){
          $scope.newNote = {};
          $scope.notes = response.data;
        });
      });
    };
    */

  }]);
})();
