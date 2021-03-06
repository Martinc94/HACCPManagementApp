angular.module('starter.controllers', ['ionic.wheel'])

  //Auth controllers
  .controller('LoginCtrl', function ($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      email: '',
      password: ''
    };

    try {
      //if has token redirects to home
      if (AuthService.isLoggedIn() == true) {
        //console.log("Found token");
        $state.go('app.home');
      }
    } catch (err) {
      //
    }
    $scope.login = function () {
      AuthService.login($scope.user).then(function (msg) {
        AuthService.getSuppliers();
        AuthService.getFood();
        AuthService.getRefridgerators();
        $state.go('app.home');

      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });
      });
    };
  })

  .controller('SignupCtrl', function ($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.signup = function () {
      AuthService.register($scope.user).then(function (msg) {
        $state.go('login');
        var alertPopup = $ionicPopup.alert({
          title: 'Register success!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: errMsg
        });
      });
    };
  })

  //Page controllers
  .controller('ForgotCtrl', function ($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      email: ''
    };

    $scope.forgot = function () {
      AuthService.forgot($scope.user).then(function (msg) {}, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'password',
          template: errMsg
        });
      });
    };
  })

  .controller('MenuCtrl', function ($scope, $window) {

    $scope.pageWidth = $window.innerWidth;

    var circles = document.getElementsByClassName('circle');

    $scope.circlesHidden = true;

    $scope.showCircles = function () {
      var $circles = angular.element(circles);
      if ($scope.circlesHidden) {
        $circles.addClass('active');
      } else {
        $circles.removeClass('active');
      }
      $scope.toggleCirclesHidden();
    };

    $scope.toggleCirclesHidden = function () {
      return $scope.circlesHidden = !$scope.circlesHidden;
    };

  })

  .controller('FittCtrl', function ($scope, AuthService, $ionicPopup, $state, $ionicLoading, $timeout, DataService, StorageService) {

    $scope.formData = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();

      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }

      });
    } //end connectionStatus

    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();

      if (!$scope.formData.q5) {
        $scope.formData.q5 = "No";
      } else {
        $scope.formData.q5 = "Yes";
      }
      if (!$scope.formData.q6) {
        $scope.formData.q6 = "No";
      } else {
        $scope.formData.q6 = "Yes";
      }
      if (!$scope.formData.q7) {
        $scope.formData.q7 = "No";
      } else {
        $scope.formData.q7 = "Yes";
      }

      if ($scope.conn == 1) {
        AuthService.fitness($scope.formData).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.formData, "FitnessForms");
      }

      $scope.formData = {};
    };


  })

  .controller('MainCtrl', function ($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function () {
      $state.go('intro');
    }
  })

  .controller('HygieneCtrl', function ($scope, AuthService, $ionicPopup, $state, $ionicLoading, $timeout, DataService, StorageService) {

    $scope.formData = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();

      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }

      });
    } //end connectionStatus

    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();
      if ($scope.conn == 1) {
        AuthService.hygieneInspection($scope.formData).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.formData, "HygieneInspectionForms");
      }

      $scope.formData = {};

    };

  }) //HygieneCtrl

  .controller('DeliveryCtrl', function ($scope, AuthService, $timeout, $ionicLoading, $ionicPopup, $state, $cordovaCamera, LocationService, DataService, StorageService) {

    $scope.deliveryForm = {};
    $scope.toggle = false;
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {
      //gets settings
      AuthService.getSuppliers();
      AuthService.getFood();

      //checks if device has internet
      $scope.connectionStatus();

      //adds lat and long to Form
      $scope.getLocation();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var supplierData = window.localStorage.getItem('SupplierData');
        supplierData = ('supplierData: ', JSON.parse(supplierData));
        $scope.suppliers = supplierData;
        console.log(supplierData);

        var foodData = window.localStorage.getItem('FoodData');
        foodData = ('foodData: ', JSON.parse(foodData));
        $scope.foods = foodData;
        console.log(foodData);
      }, 2000);

    });

    $scope.takePicture = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        cameraDirection: 1,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.toggle = true;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    }

    $scope.getLocation = function () {
      LocationService.getLocation().then(function (loc) {
        $scope.deliveryForm.lat = loc.lat;
        $scope.deliveryForm.long = loc.long;
      });
    } //end getLocation

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }
      });
    } //end connectionStatus

    //submit with Photo
    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();
      $scope.getLocation();

      if ($scope.conn == 1) {
        AuthService.postPhoto($scope.deliveryForm, $scope.imgURI).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.deliveryForm, "FoodDeliveryForms");
      }

      $scope.deliveryForm = {};
      //reset image
      //$scope.imageData = {};
    };

  }) //DeliveryCtrl

  .controller('TemperatureCtrl', function ($scope, AuthService, $timeout, $ionicLoading, $ionicPopup, $state, ionicTimePicker, DataService, StorageService) {

    $scope.cookcoolForm = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      AuthService.getFood();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var foodData = window.localStorage.getItem('FoodData');
        foodData = ('foodData: ', JSON.parse(foodData));
        $scope.foods = foodData;
        console.log(foodData);
      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {

        //var alertPopup = $ionicPopup.alert({title: 'Status!',template: status});

        if (status == "online") {
          $scope.conn = 1;
          //$scope.conn = Boolean(true);
        } else {
          $scope.conn = 0;
        }

      });
    } //end connectionStatus

    $scope.openTimePicker = function (value) {

      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            $scope.time = selectedTime.getUTCHours() + 'H :' + selectedTime.getUTCMinutes() + 'M';

            if (value === 1) {
              $scope.cookcoolForm.startTime = $scope.time;
            } else if (value === 2) {
              $scope.cookcoolForm.finishTime = $scope.time;
            } else if (value === 3) {
              $scope.cookcoolForm.fridgeTime = $scope.time;
            }


          }
        },
        inputTime: 50400,
        format: 12,
        step: 1,
        setLabel: 'Select'
      };

      ionicTimePicker.openTimePicker(ipObj1);
    };

    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();

      if ($scope.conn == 1) {
        AuthService.temperature($scope.cookcoolForm).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.cookcoolForm, "TemperatureForms");
      }

      $scope.cookcoolForm = {};

    };

  }) //TemperatureCtrl

  .controller('HotholdCtrl', function ($scope, AuthService, $ionicLoading, $timeout, $ionicPopup, $state, ionicTimePicker, DataService, StorageService) {

    $scope.hotholdForm = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      AuthService.getFood();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var foodData = window.localStorage.getItem('FoodData');
        foodData = ('foodData: ', JSON.parse(foodData));
        $scope.foods = foodData;
        console.log(foodData);
      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }
      });
    } //end connectionStatus

    $scope.openTimePicker = function () {

      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            $scope.hotholdForm.time = selectedTime.getUTCHours() + 'H :' + selectedTime.getUTCMinutes() + 'M';
          }
        },
        inputTime: 50400,
        format: 12,
        step: 1,
        setLabel: 'Select'
      };

      ionicTimePicker.openTimePicker(ipObj1);
    };

    $scope.submit = function () {
      if ($scope.conn == 1) {
        AuthService.hothold($scope.hotholdForm).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.hotholdForm, "HotholdForms");
      }

      $scope.hotholdForm = {};
    };

  }) //HotholdCtrl

  .controller('FridgeCtrl', function ($scope, AuthService, $timeout, $ionicPopup, $state, $ionicLoading, $cordovaCamera, DataService, StorageService) {

    $scope.fridge = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      AuthService.getRefridgerators();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var fridgeData = window.localStorage.getItem('FridgeData');
        fridgeData = ('fridgeData: ', JSON.parse(fridgeData));
        $scope.units = fridgeData;
        console.log($scope.units);
      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }
      });
    } //end connectionStatus

    $scope.takePicture = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        cameraDirection: 1,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.toggle = true;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    }

    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();

      if ($scope.conn == 1) {
        AuthService.fridge($scope.fridge).then(function (msg) {

          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.fridge, "FridgeTempForms");
      }


      $scope.fridge = {};

    };


  }) //FridgeCtrl

  .controller('TrainingCtrl', function ($scope, AuthService, $ionicLoading, $timeout, $ionicPopup, $state, DataService, StorageService) {

    $scope.trainingForm = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      AuthService.getRefridgerators();

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var fridgeData = window.localStorage.getItem('FridgeData');
        fridgeData = ('fridgeData: ', JSON.parse(fridgeData));
        $scope.units = fridgeData;
        console.log($scope.units);
      }, 1000);

    });

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }
      });
    } //end connectionStatus

    $scope.submit = function () {
      //refresh
      $scope.connectionStatus();

      if ($scope.conn == 1) {
        AuthService.training($scope.trainingForm).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.trainingForm, "HygieneTrainingForms");
      }

      $scope.trainingForm = {};
    };

  }) //TrainingCtrl

  .controller('TransportCtrl', function ($scope, AuthService, $ionicLoading, $timeout, $ionicPopup, $state, LocationService, DataService, StorageService) {

    $scope.transportForm = {};
    $scope.conn;

    $scope.$on('$ionicView.enter', function () {

      //checks if device has internet
      $scope.connectionStatus();

      //console.log("get food and suppliers");
      AuthService.getFood();

      //adds lat and long to Form
      $scope.getLocation();


      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      $timeout(function () {
        $ionicLoading.hide();
        var foodData = window.localStorage.getItem('FoodData');
        foodData = ('foodData: ', JSON.parse(foodData));
        $scope.foods = foodData;
        //console.log(foodData);
      }, 1000);

    });

    $scope.getLocation = function () {
      LocationService.getLocation().then(function (loc) {
        $scope.transportForm.lat = loc.lat;
        $scope.transportForm.long = loc.long;
      });
    } //end getLocation

    $scope.connectionStatus = function () {
      DataService.connectionStatus().then(function (status) {
        if (status == "online") {
          $scope.conn = 1;
        } else {
          $scope.conn = 0;
        }
      });
    } //end connectionStatus

    $scope.submit = function () {
      //refresh
      $scope.getLocation();
      $scope.connectionStatus();

      if ($scope.conn == 1) {
        AuthService.transport($scope.transportForm).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: errMsg
          });
        });
      } //end if
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'No Internet Connection!',
          template: "Saving form to device"
        });
        StorageService.storeForm($scope.transportForm, "transportForms");
      }

      $scope.transportForm = {};

    };

  }) //TransportCtrl

  .controller('SettingsCtrl', function ($scope, $timeout, AuthService, $ionicLoading, $ionicPopup, $state, $ionicListDelegate, StorageService) {
    //console.log("Start SettingsCtrl");
    $scope.suppliersSelect = false;
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.refridgerationSelect = false;
    $scope.foodSelect = false;

    // loader icon show while data is being retrieved using ionic service $ionicLoading
    $scope.loading = $ionicLoading.show({
      content: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 50,
      showDelay: 0
    })

    $timeout(function () {
      $ionicLoading.hide();
    }, 2000);

    //console.log("get suppliers");
    AuthService.getSuppliers();
    var supplierData = window.localStorage.getItem('SupplierData');

    supplierData = ('supplierData: ', JSON.parse(supplierData));
    $scope.suppliers = supplierData;

    AuthService.getRefridgerators();
    var fridgeData = window.localStorage.getItem('FridgeData');
    fridgeData = JSON.parse(fridgeData);
    $scope.units = fridgeData;

    AuthService.getFood();
    var foodData = window.localStorage.getItem('FoodData');
    foodData = ('foodData: ', JSON.parse(foodData));
    $scope.foods = foodData;

    //open/close Suppliers menu
    $scope.openSuppliers = function () {

      if ($scope.suppliersSelect == true) {
        $scope.suppliersSelect = false;
      } else {
        $scope.suppliersSelect = true;
      }
    }
    //add new supplier to suppliers array
    $scope.addSupplier = function (supplier) {

      if (supplierData.Supplier1 == undefined) {
        supplierData.Supplier1 = supplier;
      } else if (supplierData.Supplier2 == undefined) {
        supplierData.Supplier2 = supplier;
      } else if (supplierData.Supplier3 == undefined) {
        supplierData.Supplier3 = supplier;
      } else if (supplierData.Supplier4 == undefined) {
        supplierData.Supplier4 = supplier;
      } else if (supplierData.Supplier5 == undefined) {
        supplierData.Supplier5 = supplier;
      } else if (supplierData.Supplier6 == undefined) {
        supplierData.Supplier6 = supplier;
      } else if (supplierData.Supplier7 == undefined) {
        supplierData.Supplier7 = supplier;
      } else if (supplierData.Supplier8 == undefined) {
        supplierData.Supplier8 = supplier;
      } else if (supplierData.Supplier9 == undefined) {
        supplierData.Supplier9 = supplier;
      } else if (supplierData.Supplier10 == undefined) {
        supplierData.Supplier10 = supplier;
      }
    };

    //edit existing supplier
    $scope.editSupplier = function (key) {

      showPopupSupplier(key);

      $ionicListDelegate.closeOptionButtons();
    };

    showPopupSupplier = function (key) {
      //variable for text input
      $scope.suppliername = {};
      // custom popup with user instructions. Has Cancel and Save buttons
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="suppliername.name">',
        title: 'Enter Supplier Name',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.suppliername) {
                //don't allow the user to save if text has not been entered
                e.preventDefault();
              } else {

                if (key == "Supplier1") {
                  supplierData.Supplier1 = $scope.suppliername.name;
                } else if (key == "Supplier2") {
                  supplierData.Supplier2 = $scope.suppliername.name;
                } else if (key == "Supplier3") {
                  supplierData.Supplier3 = $scope.suppliername.name;
                } else if (key == "Supplier4") {
                  supplierData.Supplier4 = $scope.suppliername.name;
                } else if (key == "Supplier5") {
                  supplierData.Supplier5 = $scope.suppliername.name;
                } else if (key == "Supplier6") {
                  supplierData.Supplier6 = $scope.suppliername.name;
                } else if (key == "Supplier7") {
                  supplierData.Supplier7 = $scope.suppliername.name;
                } else if (key == "Supplier8") {
                  supplierData.Supplier8 = $scope.suppliername.name;
                } else if (key == "Supplier9") {
                  supplierData.Supplier9 = $scope.suppliername.name;
                } else if (key == "Supplier10") {
                  supplierData.Supplier10 = $scope.suppliername.name;
                }
                $scope.suppliername = {};

              }
            }
          },
        ]
      })
    }

    //delete selected supplier (slide selection and delete)
    $scope.deleteSupplier = function (key) {

      if (key == "Supplier1") {
        delete supplierData.Supplier1;
        supplierData.Supplier1 = undefined;
      } else if (key == "Supplier2") {
        delete supplierData.Supplier2;
        supplierData.Supplier2 = undefined;
      } else if (key == "Supplier3") {
        delete supplierData.Supplier3;
        supplierData.Supplier3 = undefined;
      } else if (key == "Supplier4") {
        delete supplierData.Supplier4;
        supplierData.Supplier4 = undefined;
      } else if (key == "Supplier5") {
        delete supplierData.Supplier5;
        supplierData.Supplier5 = undefined;
      } else if (key == "Supplier6") {
        delete supplierData.Supplier6;
        supplierData.Supplier6 = undefined;
      } else if (key == "Supplier7") {
        delete supplierData.Supplier7;
        supplierData.Supplier7 = undefined;
      } else if (key == "Supplier8") {
        delete supplierData.Supplier8;
        supplierData.Supplier8 = undefined;
      } else if (key == "Supplier9") {
        delete supplierData.Supplier9;
        supplierData.Supplier9 = undefined;
      } else if (key == "Supplier10") {
        delete supplierData.Supplier10;
        supplierData.Supplier10 = undefined;
      }

      $ionicListDelegate.closeOptionButtons();

    };

    //open/close Refridgeration menu
    $scope.openRefridgeration = function () {

      if ($scope.refridgerationSelect == true) {
        $scope.refridgerationSelect = false;
      } else {
        $scope.refridgerationSelect = true;
      }
    }
    //add new unit to (refridgeration) units array
    $scope.addUnit = function (unit) {

      if (fridgeData.Fridge1 == undefined) {
        fridgeData.Fridge1 = unit;
      } else if (fridgeData.Fridge2 == undefined) {
        fridgeData.Fridge2 = unit;
      } else if (fridgeData.Fridge3 == undefined) {
        fridgeData.Fridge3 = unit;
      } else if (fridgeData.Fridge4 == undefined) {
        fridgeData.Fridge4 = unit;
      } else if (fridgeData.Fridge5 == undefined) {
        fridgeData.Fridge5 = unit;
      } else if (fridgeData.Fridge6 == undefined) {
        fridgeData.Fridge6 = unit;
      }

    };

    //edit existing unit
    $scope.editUnit = function (key) {

      showPopupFridge(key);

      $ionicListDelegate.closeOptionButtons();

    };

    showPopupFridge = function (key) {
      //variable for text input
      $scope.fridgename = {};
      // custom popup with user instructions. Has Cancel and Save buttons
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="fridgename.name">',
        title: 'Enter Fridge Name',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.fridgename) {
                //don't allow the user to save if text has not been entered
                e.preventDefault();
              } else {

                if (key == "Fridge1") {
                  fridgeData.Fridge1 = $scope.fridgename.name;
                } else if (key == "Fridge2") {
                  fridgeData.Fridge2 = $scope.fridgename.name;
                } else if (key == "Fridge3") {
                  fridgeData.Fridge3 = $scope.fridgename.name;
                } else if (key == "Fridge4") {
                  fridgeData.Fridge4 = $scope.fridgename.name;
                } else if (key == "Fridge5") {
                  fridgeData.Fridge5 = $scope.fridgename.name;
                } else if (key == "Fridge6") {
                  fridgeData.Fridge6 = $scope.fridgename.name;
                }

                $scope.fridgename = {};

              }
            }
          },
        ]
      })
    }
    //delete selected unit (slide selection and delete)
    $scope.deleteUnit = function (key) {

      if (key == "Fridge1") {
        delete fridgeData.Fridge1;
        fridgeData.Fridge1 = undefined;
      } else if (key == "Fridge2") {
        delete fridgeData.Fridge2;
        fridgeData.Fridge2 = undefined;
      } else if (key == "Fridge3") {
        delete fridgeData.Fridge3;
        fridgeData.Fridge3 = undefined;
      } else if (key == "Fridge4") {
        delete fridgeData.Fridge4;
        fridgeData.Fridge4 = undefined;
      } else if (key == "Fridge5") {
        delete fridgeData.Fridge5;
        fridgeData.Fridge5 = undefined;
      } else if (key == "Fridge6") {
        delete fridgeData.Fridge6;
        fridgeData.Fridge6 = undefined;
      }

      $ionicListDelegate.closeOptionButtons();
    };



    //open/close Food menu
    $scope.openFood = function () {

      if ($scope.foodSelect == true) {
        $scope.foodSelect = false;
      } else {
        $scope.foodSelect = true;
      }
    }

    $scope.addFood = function (food) {

      if (foodData.Food1 == undefined) {
        foodData.Food1 = food;
      } else if (foodData.Food2 == undefined) {
        foodData.Food2 = food;
      } else if (foodData.Food3 == undefined) {
        foodData.Food3 = food;
      } else if (foodData.Food4 == undefined) {
        foodData.Food4 = food;
      } else if (foodData.Food5 == undefined) {
        foodData.Food5 = food;
      } else if (foodData.Food6 == undefined) {
        foodData.Food6 = food;
      } else if (foodData.Food7 == undefined) {
        foodData.Food7 = food;
      } else if (foodData.Food8 == undefined) {
        foodData.Food8 = food;
      } else if (foodData.Food9 == undefined) {
        foodData.Food9 = food;
      } else if (foodData.Food10 == undefined) {
        foodData.Food10 = food;
      }
    };

    //edit existing food
    $scope.editFood = function (key) {

      showPopupFood(key);

      $ionicListDelegate.closeOptionButtons();

    };

    showPopupFood = function (key) {
      //variable for text input
      $scope.foodstuffname = {};
      // custom popup with user instructions. Has Cancel and Save buttons
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="foodstuffname.name">',
        title: 'Enter Food Name',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.foodstuffname) {
                //don't allow the user to save if text has not been entered
                e.preventDefault();
              } else {

                if (key == "Food1") {
                  foodData.Food1 = $scope.foodstuffname.name;
                } else if (key == "Food2") {
                  foodData.Food2 = $scope.foodstuffname.name;
                } else if (key == "Food3") {
                  foodData.Food3 = $scope.foodstuffname.name;
                } else if (key == "Food4") {
                  foodData.Food4 = $scope.foodstuffname.name;
                } else if (key == "Food5") {
                  foodData.Food5 = $scope.foodstuffname.name;
                } else if (key == "Food6") {
                  foodData.Food6 = $scope.foodstuffname.name;
                } else if (key == "Food7") {
                  foodData.Food7 = $scope.foodstuffname.name;
                } else if (key == "Food8") {
                  foodData.Food8 = $scope.foodstuffname.name;
                } else if (key == "Food9") {
                  foodData.Food9 = $scope.foodstuffname.name;
                } else if (key == "Food10") {
                  foodData.Food10 = $scope.foodstuffname.name;
                }

                $scope.foodstuffname = {};

              }
            }
          },
        ]
      })
    }

    $scope.submitFridges = function () {

      if (fridgeData) {
        AuthService.putRefridgerators(fridgeData).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Successfully Updated Fridges!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error Updating Fridges',
            template: errMsg
          });
        });
      }

    };

    $scope.submitSuppliers = function () {

      if (supplierData) {
        AuthService.putSuppliers(supplierData).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Successfully Updated Suppliers!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error Updating Suppliers',
            template: errMsg
          });
        });
      }

    }; //end submitSuppliers

    $scope.submitFood = function () {

      if (foodData) {
        AuthService.putFood(foodData).then(function (msg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Successfully Updated Food!',
            template: msg
          });
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error Updating Food',
            template: errMsg
          });
        });
      }

    };

    //delete selected food (slide selection and delete)
    $scope.deleteFood = function (key) {

      if (key == "Food1") {
        delete foodData.Food1;
        foodData.Food1 = undefined;
      } else if (key == "Food2") {
        delete foodData.Food2;
        foodData.Food2 = undefined;
      } else if (key == "Food3") {
        delete foodData.Food3;
        foodData.Food3 = undefined;
      } else if (key == "Food4") {
        delete foodData.Food4;
        foodData.Food4 = undefined;
      } else if (key == "Food5") {
        delete foodData.Food5;
        foodData.Food5 = undefined;
      } else if (key == "Food6") {
        delete foodData.Food6;
        foodData.Food6 = undefined;
      } else if (key == "Food7") {
        delete foodData.Food7;
        foodData.Food7 = undefined;
      } else if (key == "Food8") {
        delete foodData.Food8;
        foodData.Food8 = undefined;
      } else if (key == "Food9") {
        delete foodData.Food9;
        foodData.Food9 = undefined;
      } else if (key == "Food10") {
        delete foodData.Food10;
        foodData.Food10 = undefined;
      }

      $ionicListDelegate.closeOptionButtons();

    };

    //open/close SavedForms menu
    $scope.openSavedForms = function () {

      if ($scope.savedSelect == true) {
        $scope.savedSelect = false;
      } else {
        $scope.savedSelect = true;
      }
    }

    $scope.submitStorageFoodDelivery = function () {
      StorageService.postForms("FoodDeliveryForms", "foodDelivery").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageFoodDelivery

    $scope.submitStorageFridgetemp = function () {
      StorageService.postForms("FridgeTempForms", "fridgetemp").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageFridgetemp

    $scope.submitStorageTemperature = function () {
      StorageService.postForms("TemperatureForms", "temperature").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageTemperature

    $scope.submitStorageHothold = function () {
      StorageService.postForms("HotholdForms", "hothold").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageHothold

    $scope.submitStorageHygieneInspection = function () {
      StorageService.postForms("HygieneInspectionForms", "hygieneInspection").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageHygieneInspection

    $scope.submitStorageHygieneTra = function () {
      StorageService.postForms("HygieneTrainingForms", "hygieneTraining").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageFitness

    $scope.submitStorageFitness = function () {
      StorageService.postForms("FitnessForms", "fitnessToWork").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageFitness

    $scope.submitStorageTransport = function () {
      StorageService.postForms("transportForms", "transport").then(function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: errMsg
        });
      });
    }; //submitStorageTransport



    $scope.logout = function () {
      AuthService.logout();
    }; //end logout

    //when page is entered
    $scope.$on('$ionicView.beforeEnter', function () {});

    //when page is exited
    $scope.$on('$ionicView.beforeLeave', function () {

      // loader icon show while data is being retrieved using ionic service $ionicLoading
      $scope.loading = $ionicLoading.show({
        content: '<i class="icon ion-loading-c"></i>',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 50,
        showDelay: 0
      })

      AuthService.getSuppliers();
      AuthService.getFood();
      AuthService.getRefridgerators();

      $timeout(function () {
        $ionicLoading.hide();
      }, 2000);

    });

  }) //SettingsCtrl

  .controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate) {
    //home controller
    $scope.toggleLeftSideMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  .controller('NavCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showRightMenu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };

  });