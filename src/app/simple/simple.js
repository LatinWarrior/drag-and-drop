angular
.module("app")
.component("simple", {
  bindings: {
    models: '<'
  },
  templateUrl: '/src/app/simple/simple.html',
  controller: controller
});

// static controller.$inject = [];
function controller() {

  var $ctrl = this;

    $ctrl.models = {};
    $ctrl.modelAsJson = {};

    $ctrl.updateModelJson = function() {
        // console.log('In $ctrl.updateModel. $ctrl.models: ', $ctrl.models);
        $ctrl.modelAsJson = angular.toJson($ctrl.models, true);
    }

    $ctrl.$onInit = function () {

      // console.log('in $onInit of simple controller');

      $ctrl.models = {
          selected: null,
          lists: {"A": [], "B": []}
      };

      // Generate initial model
      for (var i = 1; i <= 3; ++i) {
          $ctrl.models.lists.A.push({label: "Item A" + i, type: 'hammer'});
          $ctrl.models.lists.B.push({label: "Item B" + i, type: 'nail'});
      }

      $ctrl.modelAsJson = angular.toJson($ctrl.models, true);

      // console.log('in $onInit of simple controller. models: ', $ctrl.models);
    };

    $ctrl.$doCheck = function() {
      //console.log('in $doCheck of simple component.');
    };

    // Model to JSON for demo purpose
    $ctrl.$onChanges = function(changes) {

      console.log('in $onChanges of simple component. changes.models: ', changes.models);
        // if (changes.models.isFirstChange()) {
        //     console.log('in $onChanges of simple controller. changes.models: ', changes.models);
        //     return;
        // }

        if (changes.models &&
            !changes.models.isFirstChange()) {
          $ctrl.models = changes.models;
          $ctrl.modelAsJson = angular.toJson($ctrl.models, true);
      }
    };

}
