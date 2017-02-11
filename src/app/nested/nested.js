angular
.module("app")
.component("nested", {
  bindings: {

  },
  templateUrl: '/src/app/nested/nested.html',
  controller: function() {

    console.log('Hello from nested controller.');

    var $ctrl = this;

    $ctrl.hello = "Hello from ctrl";
  }
});
