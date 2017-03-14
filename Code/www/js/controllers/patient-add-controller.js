app.controller('PatientAddController', function ($scope, $location, $cordovaCamera, $stateParams, PatientService) {

    console.log("Id for edit is: " + $stateParams.patientId);
    if ($stateParams.patientId != null) {        
        // setting view title 
        $scope.title = "Edit Patient"
        
        // get patient info for edit
        $scope.patient = PatientService.get($stateParams.patientId);
        //console.log($scope.patient);
    }
    else {        
        // setting view title 
        $scope.title = "Add Patient"
        
        // initialize patient info in case of add
        $scope.patient = PatientService.inialize();
    }

    console.log($scope.patient);

    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 150,
            targetHeight: 150,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.patient.face = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log("An Error Occurred: " + err);
        });
    }

    $scope.selectPicture = function () {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };

        $cordovaCamera.getPicture(options).then(function (imageUri) {
            $scope.patient.face = imageUri;
        }, function (err) {
            //console.log("An Error Occurred: " + err);
        });
    }

    $scope.save = function (addPatientForm) {
        if (addPatientForm.$valid) {

            if ($stateParams.patientId != null) {
                // update patient info into database
                PatientService.update($scope.patient.id, $scope.patient.firstName, $scope.patient.lastName, $scope.patient.lastText, $scope.patient.face);
            }
            else {
                // set default image                 
                if ($scope.patient.face == null || $scope.patient.face == '') {
                    $scope.patient.face = 'img/ben.png'
                }
                
                // insert patient info into database
                PatientService.save($scope.patient.firstName, $scope.patient.lastName, $scope.patient.lastText, $scope.patient.face);
            }
            
            // redirect to patients list
            $location.path('tab/patients');
        }
    }

})