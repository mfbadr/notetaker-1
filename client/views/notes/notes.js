(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', function($rootScope, $scope, $state, Note, $stateParams){
    $scope.note = {};
    $scope.mode = $state.current.name;

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
      Note.create(note).then(function(response){
        Note.list().then(function(response){
          $scope.newNote = {};
          $scope.notes = response.data;
        });
      }, function(){
        console.log('error');
      });
    };

  }]);
})();
