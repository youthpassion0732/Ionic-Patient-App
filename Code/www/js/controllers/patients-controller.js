app.controller('PatientsController', function ($scope, $location, PatientService) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.isShowCancel = false;
    $scope.patients = PatientService.all();

    $scope.remove = function (patient) {
        PatientService.remove(patient);
    };

    $scope.redirectToEdit = function (patientId) {
        $location.path('tab/patients/add/'+ patientId);
    };

})