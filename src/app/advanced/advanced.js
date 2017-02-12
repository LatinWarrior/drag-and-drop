angular
    .module("app")
    .component("advanced", {
        bindings: {
            model: '<'
        },
        templateUrl: '/src/app/advanced/advanced.html',
        controller: [controller]
    });

function controller() {

    var $ctrl = this;

    $ctrl.model = [];
    $ctrl.modelAsJson = {};

    $ctrl.$onInit = function () {       

        // Generate initial model
        var id = 10;
        $ctrl.model = [[], []];
        angular.forEach(['all', 'move', 'copy', 'link', 'copyLink', 'copyMove'], function (effect, i) {
            var container = { items: [], effectAllowed: effect };
            for (var k = 0; k < 7; ++k) {
                container.items.push({ label: effect + ' ' + id++, effectAllowed: effect });
            }
            $ctrl.model[i % $ctrl.model.length].push(container);
        });

        $ctrl.modelAsJson = angular.toJson($ctrl.model, true);

        // console.log('in $onInit of simple controller. models: ', $ctrl.models);
    };

    $ctrl.updateModelJson = function () {
        // console.log('In $ctrl.updateModel. $ctrl.models: ', $ctrl.models);
        $ctrl.modelAsJson = angular.toJson($ctrl.model, true);
    }

    $ctrl.$doCheck = function () {
        //console.log('in $doCheck of simple component.');
    };

    // Model to JSON for demo purpose
    $ctrl.$onChanges = function (changes) {

        console.log('in $onChanges of simple component. changes.models: ', changes.model);
        // if (changes.models.isFirstChange()) {
        //     console.log('in $onChanges of simple controller. changes.models: ', changes.models);
        //     return;
        // }

        if (changes.model &&
            !changes.model.isFirstChange()) {
            $ctrl.models = changes.model;
            $ctrl.modelAsJson = angular.toJson($ctrl.model, true);
        }
    };

}
