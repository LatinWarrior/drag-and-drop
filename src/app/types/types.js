angular
    .module("app")
    .component("types", {
        bindings: {
            lists: '<'
        },
        templateUrl: '/src/app/types/types.html',
        controller: [controller]
    });

//controller.['$inject'] = ['ng'];
function controller() {

    var $ctrl = this;

    $ctrl.lists = {};
    $ctrl.modelAsJson = {};

    $ctrl.onMoved = function (list, $index) {
        console.log('list: ', list);
        console.log('$index', $index);
        //if (list.items.label !== 'Palette') { console.log('list.items.label: ', list.items.label); list.items.splice($index, 1); };         
        // console.log('In $ctrl.updateModel. $ctrl.models: ', $ctrl.models);
        if (list.label !== 'Palette') {
            list.items.splice($index, 1);
            // console.log('list.items.index before: ', list.items.index);
            // list.items.index = $index + 1;
            // console.log('list.items.index after: ', list.items.index);
        }        

        $ctrl.modelAsJson = angular.toJson($ctrl.lists, true);
    }

    $ctrl.$onInit = function () {

        console.log('in $onInit of types controller');

        $ctrl.lists = [
                {
                    selected: null,
                    id: 1,
                    label: "L-USQ",
                    allowedTypes: ['phone', 'car'],
                    effectAllowed: "move",
                    max: 7,
                    items: [
                        { name: "P-003", type: "phone", index: 0, icon: "fa fa-fax" },
                        { name: "P-004", type: "phone", index: 1, icon: "fa fa-fax" },
                        { name: "P-005", type: "phone", index: 2, icon: "fa fa-fax" }
                    ]
                },
                {
                    selected: null,
                    id: 2,
                    label: "L-SQ",
                    allowedTypes: ['phone', 'car'],
                    effectAllowed: "move",
                    max: 10,
                    items: [
                        { name: "P-006", type: "phone", index: 0, icon: "fa fa-fax" },
                        { name: "P-007", type: "phone", index: 1, icon: "fa fa-fax" },
                        { name: "P-008", type: "phone", index: 2, icon: "fa fa-fax" },
                        { name: "C-006", type: "car", index: 3, icon: "fa fa-taxi" }
                    ]
                },
                {
                    selected: null,
                    id: 3,
                    label: "R-SQ",
                    allowedTypes: ['phone', 'car'],
                    effectAllowed: "move",
                    max: 3,
                    items: [                       
                        { name: "C-007", type: "car", index: 0, icon: "fa fa-taxi" }
                    ]
                },
                {
                    selected: null,
                    id: 4,
                    label: "R-USQ",
                    allowedTypes: ['phone', 'car'],
                    effectAllowed: "move",
                    max: 5,
                    items: [
                        { name: "C-003", type: "car", index: 0, icon: "fa fa-taxi" },
                        { name: "C-004", type: "car", index: 1, icon: "fa fa-taxi" },
                        { name: "C-005", type: "car", index: 2, icon: "fa fa-taxi" }
                    ]
                },
                {
                    selected: null,
                    id: 0,
                    label: "Palette",
                    allowedTypes: [],
                    effectAllowed: "copy",
                    max: -1,
                    items: [                        
                        { name: "Phone", type: "phone", index: -1, icon: "fa fa-fax" },
                        { name: "iPad", type: "ipad", index: -1, icon: "fa fa-building-o" },
                        { name: "Car", type: "car", index: -1, icon: "fa fa-taxi" }                        
                    ]
                }
            ];        

        $ctrl.modelAsJson = angular.toJson($ctrl.lists, true);

        console.log('in $onInit of simple controller. lists: ', $ctrl.lists);
    };

    $ctrl.$doCheck = function () {
        //console.log('in $doCheck of simple component.');
    };

    // Model to JSON for demo purpose
    $ctrl.$onChanges = function (changes) {

        console.log('in $onChanges of simple component. changes.models: ', changes.lists);
        // if (changes.models.isFirstChange()) {
        //     console.log('in $onChanges of simple controller. changes.models: ', changes.models);
        //     return;
        // }

        if (changes.lists &&
            !changes.lists.isFirstChange()) {
            $ctrl.models = changes.lists;
            $ctrl.modelAsJson = angular.toJson($ctrl.lists, true);
        }
    };

    $ctrl.dragoverCallback = function(index, external, type, callback) {
        //debugger;
        $ctrl.logListEvent('dragged over', null, index, external, type);
        // Invoke callback to origin for container types.
        if (type == 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $ctrl.dropCallback = function(list, index, item, external, type) {
        // debugger;
        $ctrl.logListEvent('In dropCallback. Dropped at ', list, index, external, type);       
        if (item.index < 0){
            item.name = type.substring(0, 1).toUpperCase() + '-000';
        }        
        //item.index = index;
        // Return false here to cancel drop. Return true if you insert the item yourself.
        return item;
    };

    $ctrl.logEvent = function(message) {
        console.log(message);
    };

    $ctrl.onInserted = function(action, list, index, external, type) {
        // debugger;
        var newIndex = 0;
        angular.forEach(list.items, (item) => {
            item.index = newIndex;
            newIndex++;
        });

        $ctrl.logListEvent('In onInserted. Inserted at ', list, index, external, type);  
    };

    $ctrl.logListEvent = function(action, list, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);
    }

}
