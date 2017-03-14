app.factory('PatientService', function ($ionicPopup, $cordovaSQLite) {

    // Might use a resource here that returns a JSON array
    var patients = [];

    return {
        inialize: function () {
            var patient = {
                id: -1,
                firstName: '',
                lastName: '',
                lastText: '',
                face: ''
            }
            return patient;
        },
        all: function () {
            patients = [];

            try {

                var query = "SELECT id, firstName, lastName, lastText, face FROM patient";
                $cordovaSQLite.execute(db, query, []).then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            patients.push({ id: res.rows.item(i).id, firstName: res.rows.item(i).firstName, lastName: res.rows.item(i).lastName, lastText: res.rows.item(i).lastText, face: res.rows.item(i).face });
                        }
                    } else {
                        $ionicPopup.alert({
                            title: '',
                            template: 'No results found'
                        });
                    }
                }, function (err) {
                    $ionicPopup.alert({
                        title: 'Error in loading patients',
                        template: JSON.stringify(err)
                    });
                });
            }
            catch (error) {
                $ionicPopup.alert({
                    title: 'Error in load',
                    template: JSON.stringify(error.message)
                });
            }

            return patients;
        },
        save: function (firstName, lastName, lastText, face) {
            var query = "INSERT INTO patient (firstName, lastName, lastText, face) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [firstName, lastName, lastText, face]).then(function (res) {
                //console.log("insertId: " + res.insertId);
            }, function (err) {
                //console.error(err);
            });
        },
        update: function (id, firstName, lastName, lastText, face) {
            var query = "UPDATE patient SET firstName = ?, lastName = ?, lastText = ?, face = ? Where id = ?";
            $cordovaSQLite.execute(db, query, [firstName, lastName, lastText, face, id]).then(function (res) {
                //console.log("updateId: " + id);
            }, function (err) {
                //console.error(err);
            });
        },
        remove: function (patient) {
            var query = "DELETE FROM patient where id = ?";
            $cordovaSQLite.execute(db, query, [patient.id]).then(function (res) {
                patients.splice(patients.indexOf(patient), 1);
            }, function (err) {
                //console.error(err);
            });
        },
        get: function (patientId) {
            for (var i = 0; i < patients.length; i++) {
                if (patients[i].id === parseInt(patientId)) {
                    return patients[i];
                }
            }
            return null;
        }
    };
});
