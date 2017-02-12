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
        $ctrl.model = [[], [], [], [], []];
        // angular.forEach(['all', 'move', 'copy', 'link', 'copyLink', 'copyMove'], function (effect, i) {
        //     var container = { items: [], effectAllowed: effect };
        //     for (var k = 0; k < 23; ++k) {
        //         container.items.push({ label: effect + ' ' + id++, effectAllowed: effect });
        //     }
        //     $ctrl.model[i % $ctrl.model.length].push(container);
        // });

        //  angular.forEach(['L-UNSQ', 'L-SQ', 'R-SQ', 'R-SQ'], function (effect, index) {
        //     var container = { items: [], effectAllowed: 'copy' };
        //     for (var k = 0; k < 24; ++k) {
        //         container.items.push({ label: effect + ' ' + id++, effectAllowed: effect });
        //     }
        //     $ctrl.model[index % $ctrl.model.length].push(container);
        // });

        var container1 = { items: [], effectAllowed: 'move', id: 1, name: 'L-USQ', source: false };
        $ctrl.model[0].push(container1);
        var container2 = { items: [], effectAllowed: 'move', id: 2, name: 'L-SQ', source: false };
         $ctrl.model[1].push(container2);
        var container3 = { items: [], effectAllowed: 'move', id: 3, name: 'R-SQ', source: false };
         $ctrl.model[2].push(container3);
        var container4 = { items: [], effectAllowed: 'move', id: 4, name: 'R-USQ', source: false };
         $ctrl.model[3].push(container4);
        var itemPhone = { id: 1, name: 'phone', label: 'phone', type: 'phone', index: -1, icon: 'fa fa-phone' };
        var itemCar = { id: 2, name: 'car', label: 'car', type: 'car', index: -1, icon: 'fa fa-car' };
        var container5 = { items: [itemPhone, itemCar], effectAllowed: 'copy', id: 0, name: 'PALETTE', source: true };
         $ctrl.model[4].push(container5);

        $ctrl.modelAsJson = angular.toJson($ctrl.model, true);

        // console.log('in $onInit of simple controller. models: ', $ctrl.models);
    };

    $ctrl.onMoved = function (container, item, $index) {        
        debugger;
        if (!container.source) {
            container.items.splice($index, 1);            
        }        

        //$ctrl.modelAsJson = angular.toJson($ctrl.lists, true);
    }

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
