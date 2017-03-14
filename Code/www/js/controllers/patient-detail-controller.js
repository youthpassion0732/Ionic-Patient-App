app.controller('PatientDetailController', function ($scope, $stateParams, PatientService) {
    $scope.patient = PatientService.get($stateParams.patientId);
})