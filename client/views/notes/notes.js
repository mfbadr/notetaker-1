(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
    $scope.note = {};
    $scope.mode = $state.current.name;

    Note.list().then(function(response){
      $scope.notes = response.data;
    });

    $scope.create = function(note){
      Note.create(note).then(function(response){
        Note.list().then(function(response){
          $scope.note = {};
          $scope.notes = response.data;
        });
      }, function(){
        console.log('error');
      });
    };

  }]);
})();
