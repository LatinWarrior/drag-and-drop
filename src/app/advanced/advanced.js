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

    $ctrl.dragoverCallback = function(index, external, type, callback) {
        $ctrl.logListEvent('dragged over', index, external, type);
        // Invoke callback to origin for container types.
        if (type == 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $ctrl.dropCallback = function(index, item, external, type) {
        $ctrl.logListEvent('dropped at', index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
        return item;
    };

    $ctrl.logEvent = function(message) {
        console.log(message);
    };

    $ctrl.logListEvent = function(action, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);
    };

}
