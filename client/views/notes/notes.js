(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', '$upload', function($rootScope, $scope, $state, Note, $stateParams, $upload){
    $scope.note = {};
    $scope.mode = $state.current.name;
    $scope.count = 0;
    var files;

    $scope.fileSelected = function(f){
      files = f;
    };

    if($scope.mode === 'notes'){
      Note.list($state.params.tag || '%', $state.params.page * 1 || 0).then(function(response){
        console.log('got notes');
        $scope.notes = response.data;
      }, function(response){
        console.log('error getting notes');
      });
    }

    if($scope.mode === 'viewNote'){
      var noteId = $stateParams.noteId;
      Note.findOne(noteId).then(function(response){
        $scope.note = response.data[0];
      }, function(response){
        //reject promise
        console.log('something went wrong', response);
      });
    }

    $scope.create = function(note){
      $scope.count = 0;
      Note.create(note).then(function(response){
        //debugger;
        $scope.note = {};
        if($scope.files){
          Note.upload(response.data.noteId, $scope.files);
        }else{
          $state.reload();
        }
      });
    };

    $scope.$on('upload', function(e, count){
      $scope.count = count;
      if($scope.count === $scope.files.length){
        $state.reload();
      }
    });

  }]);
})();
