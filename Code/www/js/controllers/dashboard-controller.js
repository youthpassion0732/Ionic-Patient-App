app.controller('DashboardController', function ($scope, PatientService) {
	$scope.totalPatients = PatientService.all();
})