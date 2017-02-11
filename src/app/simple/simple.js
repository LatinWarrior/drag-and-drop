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

  console.log('Hello from simple controller.');

    // $ctrl.models = {
    //     selected: null,
    //     lists: {"A": [], "B": []}
    // };

    // // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $ctrl.models.lists.A.push({label: "Item A" + i});
    //     $ctrl.models.lists.B.push({label: "Item B" + i});
    // }

    $ctrl.models = {};
    $ctrl.modelAsJson = {};

    $ctrl.$onInit = function () {

      console.log('in $onInit of simple controller');

      $ctrl.models = {
          selected: null,
          lists: {"A": [], "B": []}
      };

      // Generate initial model
      for (var i = 1; i <= 3; ++i) {
          $ctrl.models.lists.A.push({label: "Item A" + i});
          $ctrl.models.lists.B.push({label: "Item B" + i});
      }

      $ctrl.modelAsJson = angular.toJson($ctrl.models, true);

      console.log('in $onInit of simple controller. models: ', $ctrl.models);
    };

    // Model to JSON for demo purpose
    $ctrl.$onChanges = function(changes) {
        console.log('in $onChanges of simple controller. changes.models: ', changes.models);
        if (changes.models){
          $ctrl.models = changes.models;
          $ctrl.modelAsJson = angular.toJson($ctrl.models, true);
      }
    };

}
