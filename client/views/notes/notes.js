(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
    $scope.note = {};
    $scope.mode = $state.current.name;

    if($state.current.name === 'listNotes'){
      Note.list().then(function(response){
        $scope.notes = response.data;
      });
    }

    $scope.create = function(note){
      Note.create(note).then(function(response){
        console.log(response.data);
        $state.go('listNotes');
      }, function(){
        console.log('error');
      });
    };

  }]);
})();
