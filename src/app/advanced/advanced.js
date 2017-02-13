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

        debugger;

        // Generate initial model
        var id = 10;
        // $ctrl.model = [
        //     [{ name: "L-USQ", index: 0 }],
        //     [{ name: "L-SQ", index: 1  }],
        //     [{ name: "R-SQ", index: 2  }],
        //     [{ name: "R-USQ", index: 3  }],
        //     [{ name: 'PALETTE', index: -1  }]
        // ];

        $ctrl.model = [[],[],[],[],[]];

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
        //debugger;
        //var container1 = { items: [], effectAllowed: 'move', id: 1, name: '', source: false , index: 0};
        for(var i = 0; i < 10; i++) {
            $ctrl.model[0].push({ items: [], effectAllowed: 'copyMove', id: i, name: i + 1, source: false , index: i, allowedTypes: ['phone', 'car']});
            $ctrl.model[1].push({ items: [], effectAllowed: 'copyMove', id: i, name: i + 1, source: false , index: i, allowedTypes: ['phone', 'car']});
            $ctrl.model[2].push({ items: [], effectAllowed: 'copyMove', id: i, name: i + 1, source: false , index: i, allowedTypes: ['phone', 'car']});
            $ctrl.model[3].push({ items: [], effectAllowed: 'copyMove', id: i, name: i + 1, source: false , index: i, allowedTypes: ['phone', 'car']});
        }
        //var container12 = { items: [], effectAllowed: 'move', id: 12, name: '', source: false , index: 0};
        // $ctrl.model[0].push(container1);
        // $ctrl.model[0].push(container12);
        // var container2 = { items: [], effectAllowed: 'move', id: 2, name: '', source: false, index: 1 };
        // $ctrl.model[1].push(container2);
        // var container3 = { items: [], effectAllowed: 'move', id: 3, name: '', source: false, index: 2 };
        // $ctrl.model[2].push(container3);
        // var container4 = { items: [], effectAllowed: 'move', id: 4, name: '', source: false, index: 3 };
        // $ctrl.model[3].push(container4);
        var itemPhone = { id: 1, name: 'phone', label: 'phone', type: 'phone', index: -1, icon: 'fa fa-phone', effectAllowed: 'copy', source: true, allowedTypes: [] };
        var itemCar = { id: 2, name: 'car', label: 'car', type: 'car', index: -1, icon: 'fa fa-car', effectAllowed: 'copy', source: true, allowedTypes: [] };
        var container5 = { items: [itemPhone, itemCar], effectAllowed: 'copy', id: 0, name: 'PALETTE', source: true, index: -1 };
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

    $ctrl.onInserted = function (action, list, index, external, type) {
        debugger;
        var newIndex = 0;
        angular.forEach(list.items, (item) => {
            item.index = newIndex;
            newIndex++;
        });

        $ctrl.logListEvent('In onInserted. Inserted at ', list, index, external, type);
    };


    $ctrl.updateModelJson = function () {
        debugger;
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

    $ctrl.dragoverCallback = function (index, external, type, callback) {
        debugger;
        $ctrl.logListEvent('dragged over', index, external, type);
        // Invoke callback to origin for container types.
        if (type == 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 2; // Disallow dropping more than 3 items.
    };

    $ctrl.dropCallback = function (index, item, external, type) {
        debugger;
        $ctrl.logListEvent('dropped at', index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
        return item;
    };

    $ctrl.logEvent = function (message) {
        console.log(message);
    };

    $ctrl.logListEvent = function (action, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);
    };

}
