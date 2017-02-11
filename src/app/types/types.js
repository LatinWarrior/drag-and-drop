angular
    .module("app")
    .component("types", {
        bindings: {
            lists: '<'
        },
        templateUrl: '/src/app/types/types.html',
        controller: controller
    });

// static controller.$inject = [];
function controller() {

    var $ctrl = this;

    $ctrl.lists = {};
    $ctrl.modelAsJson = {};

    $ctrl.updateModelJson = function () {
        // console.log('In $ctrl.updateModel. $ctrl.models: ', $ctrl.models);
        $ctrl.modelAsJson = angular.toJson($ctrl.lists, true);
    }

    $ctrl.$onInit = function () {

        console.log('in $onInit of types controller');

        $ctrl.lists = [
                {
                    selected: null,
                    label: "Hammers",
                    allowedTypes: ['hammer'],
                    max: 4,
                    tools: [
                        { name: "Hammer 3", type: "hammer", index: 0 },
                        { name: "Hammer 4", type: "hammer", index: 1 },
                        { name: "Hammer 5", type: "hammer", index: 2 }
                    ]
                },
                {
                    selected: null,
                    label: "Nails",
                    allowedTypes: ['nail'],
                    max: 4,
                    tools: [
                        { name: "Nail 3", type: "nail", index: 0 },
                        { name: "Nail 4", type: "nail", index: 1 },
                        { name: "Nail 5", type: "nail", index: 2 }
                    ]
                },
                {
                    selected: null,
                    label: "Tools",
                    allowedTypes: [],
                    max: 6,
                    tools: [                        
                        { name: "Hammer", type: "hammer", index: -1 },
                        { name: "Hose", type: "hose", index: -1 },
                        { name: "Nail", type: "nail", index: -1 }                        
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

}
