// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;

var app = angular.module('starter', ['ngCordova', 'ionic', 'ngMessages'])
    .run(function ($ionicPlatform, $cordovaSQLite, $ionicPopup) {
        $ionicPlatform.ready(function () {
            try {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                if (window.cordova) {                                       
                    // creating SqlLite datatable if device is cordova
                    db = $cordovaSQLite.openDB({name: "clinic.db"});                    
                }
                else {
                    // creating websql datatable if device is browser  
                    db = openDatabase('clinic.db', '1.0', 'websql clinic db', 2 * 1024 * 1024);
                }

                // drop table
                // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS patient;");         
                
                // creating database tables    
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS patient (id integer primary key, firstName text, lastName text, lastText text, face text)");                 
            }
            catch (error) {
                $ionicPopup.alert({
                    title: 'Catch Error in ready',
                    template: JSON.stringify(error.message)
                });
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

        // Each tab has its own nav history stack:
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('tab.patients', {
                url: '/patients',
                views: {
                    'tab-patients': {
                        templateUrl: 'templates/tab-patients.html',
                        controller: 'PatientsController'
                    }
                }
            })
            .state('tab.patient-add', {
                url: '/patients/add/:patientId', // here patientId is the optional parameter
                params: {
                    patientId: { squash: true, value: null } 
                    // above line will make both below routes working:
                    // #/patients/add
                    // #/patients/add/
                },
                views: {
                    'tab-patients': {
                        templateUrl: 'templates/patient-add.html',
                        controller: 'PatientAddController'
                    }
                }
            })
            .state('tab.patient-detail', {
                url: '/patients/:patientId',
                views: {
                    'tab-patients': {
                        templateUrl: 'templates/patient-detail.html',
                        controller: 'PatientDetailController'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountController'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
