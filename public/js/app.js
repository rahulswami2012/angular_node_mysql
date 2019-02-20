var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider) {

    $routeProvider
      .when("/", {
        templateUrl: "../html/employee.html",
        controller: "employeeCtrl"
      })
      .when("/add_employee", {
          templateUrl: "../html/add_employee.html",
        controller: "employeeCtrl"
      })
        .when("/edit_employee/:operation/:employeeId", {
            templateUrl: "../html/edit_employee.html",
        controller: "employeeCtrl"
      })
        .when("/delete_employee/:operation/:employeeId", {
            templateUrl: "../html/edit_employee.html",
        controller: "employeeCtrl"
      });

});


app.controller('employeeCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.employees = [];
    $scope.employeeToEdit = {};

    $scope.getemployees = function () {

        $http({
            method: "GET",
            url: " http://localhost:4301/employees"
        }).then(function successCallback(res) {
            $scope.employees = res.data;
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
        });

    };

    $scope.addEmployees = function(employee) {
      $http({
        method: "POST",
        url: " http://localhost:4301/employees/add",
        data: JSON.stringify(employee)
      }).then(function successCallback(res) {
          if (res.data === "success") {
            $location.path("/");
          }
        }, function failureCallback(res) {
          $scope.errorMsg = res.statusText;
        });
    };

    $scope.getEmployeeById = function (id) {

        $http({
            method: "GET",
            url: " http://localhost:4301/employees/edit/" + id,
        }).then(function successCallback(res) {
            $scope.employeeToEdit = res.data[0];
            console.log('get employee Info', $scope.employeeToEdit);
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
        });

    };

    $scope.updateEmployee = function(employeeToEdit) {
      $http({
        method: "POST",
        url: " http://localhost:4301/employees/edit/" + employeeToEdit.id,
        data: JSON.stringify(employeeToEdit)
      }).then(function successCallback(res) {
          $location.path("/");
        }, function failureCallback(res) {
          $scope.errorMsg = res.statusText;
        });
    };

    $scope.deleteEmployee = function (employeeId) {

        $http({
            method: "GET",
            url: " http://localhost:4301/employees/delete/" + employeeId
        }).then(function successCallback(res) {
            $location.path("/");
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
        });
    };
    $scope.cancelAdd = function () {
        $location.path("/");
    }
    $scope.init = function () {
        var employeeId = $routeParams.employeeId;
        var operation = $routeParams.operation;

        if (operation === 'edit') {
            $scope.getemployeeById(employeeId);
        } else if (operation === 'delete') {
            $scope.deleteemployee(employeeId);
        } else {
            $scope.getemployees();
        }
    };


        $scope.countries = {

             'India': {
                'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Akola'],
                'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur'],
                'Rajasthan': ['Jaipur', 'Ajmer', 'Jodhpur']
            }        };

        $scope.GetSelectedCountry = function () {
            $scope.strCountry = "India"
        };
        $scope.GetSelectedState = function () {
            $scope.strState = $scope.employee.state;
        };
    

    $scope.init();
});
