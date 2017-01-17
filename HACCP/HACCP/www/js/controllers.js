angular.module('starter.controllers', ['ionic.wheel'])

//Auth controllers
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      AuthService.getSuppliers();
      AuthService.getFood();
      AuthService.getRefridgerators();
      $state.go('app.home');

    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

.controller('SignupCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

//Page controllers
.controller('ForgotCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    email: ''
  };

  $scope.forgot = function() {
    AuthService.forgot($scope.user).then(function(msg) {
      //$state.go('login');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'password',
        template: errMsg
      });
    });
  };
})

.controller('MenuCtrl', function($scope, $window) {

  $scope.pageWidth = $window.innerWidth;

  var circles = document.getElementsByClassName('circle');

  $scope.circlesHidden = true;

  $scope.showCircles= function() {
    var $circles = angular.element(circles);
    if ($scope.circlesHidden) {
      $circles.addClass('active');
    } else {
      $circles.removeClass('active');
    }
    $scope.toggleCirclesHidden();
  };

  $scope.toggleCirclesHidden = function() {
    return $scope.circlesHidden = !$scope.circlesHidden;
  };

})

.controller('FittCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.formData = {};

  $scope.submit = function() {
    if(!$scope.formData.q5){
      //console.log("no 5");
      //$scope.formData.q5=false;
      $scope.formData.q5="No";
    }
    else{
      $scope.formData.q5="Yes";
    }
    if(!$scope.formData.q6){
      //console.log("no 6");
      //$scope.formData.q6=false;
        $scope.formData.q6="No";
    }
    else{
      $scope.formData.q6="Yes";
    }
    if(!$scope.formData.q7){
      //console.log("no 7");
      //$scope.formData.q7=false;
      $scope.formData.q7="No";
    }
    else{
      $scope.formData.q7="Yes";
    }

    AuthService.fitness($scope.formData).then(function(msg) {
     //redirect to home??
      //$state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: msg
        });
     }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: errMsg
      });
    });

    $scope.formData = {};
  };


})

.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function(){
        $state.go('intro');
    }



})

.controller('HygieneCtrl', function($scope, AuthService, $ionicPopup, $state){

 $scope.formData = {};

  $scope.submit = function() {
  AuthService.hygieneInspection($scope.formData).then(function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Success!',
      template: msg
      });
   }, function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: errMsg
    });
  });

  $scope.formData={};

  };

})//HygieneCtrl

.controller('DeliveryCtrl', function($scope, AuthService, $timeout, $ionicLoading, $ionicPopup, $state, $cordovaCamera) {

  $scope.deliveryForm={};
  $scope.toggle=false;

  $scope.$on('$ionicView.enter', function(){

    console.log("get food and suppliers");
    AuthService.getSuppliers();
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

  $scope.submitForm=function(deliveryForm){

  }//submitForm

  $scope.submit = function() {
    AuthService.foodDelivery($scope.deliveryForm).then(function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: msg
        });
     }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: errMsg
      });
    });

    $scope.deliveryForm = {};
  };

  $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            cameraDirection: 1,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.toggle=true;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

})//DeliveryCtrl

.controller('TemperatureCtrl', function($scope, AuthService, $timeout, $ionicLoading, $ionicPopup, $state, ionicTimePicker) {

  $scope.cookcoolForm = {};

  $scope.$on('$ionicView.enter', function(){

    console.log("get food and suppliers");
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



  $scope.openTimePicker=function(value){

    var ipObj1 = {
    callback: function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      }
      else {
        var selectedTime = new Date(val * 1000);
        $scope.time=selectedTime.getUTCHours() + 'H :' + selectedTime.getUTCMinutes() + 'M';
        //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');

        if(value===1){
          $scope.cookcoolForm.startTime=$scope.time;
        }
        else if(value===2){
          $scope.cookcoolForm.finishTime=$scope.time;
        }
        else if(value===3){
          $scope.cookcoolForm.fridgeTime=$scope.time;
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




  $scope.submit = function() {
  AuthService.temperature($scope.cookcoolForm).then(function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Success!',
      template: msg
      });
   }, function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: errMsg
    });
  });

  $scope.cookcoolForm = {};

  };

})//TemperatureCtrl

.controller('HotholdCtrl', function($scope, AuthService, $ionicLoading, $timeout, $ionicPopup, $state, ionicTimePicker) {

  $scope.hotholdForm = {};

  $scope.$on('$ionicView.enter', function(){

    console.log("get food and suppliers");
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

  $scope.openTimePicker=function(){

    var ipObj1 = {
    callback: function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      }
      else {
        var selectedTime = new Date(val * 1000);
        $scope.hotholdForm.time=selectedTime.getUTCHours() + 'H :' + selectedTime.getUTCMinutes() + 'M';


      }
    },
    inputTime: 50400,
    format: 12,
    step: 1,
    setLabel: 'Select'
  };

  ionicTimePicker.openTimePicker(ipObj1);
  };

  $scope.submit = function() {
  AuthService.hothold($scope.hotholdForm).then(function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Success!',
      template: msg
      });
   }, function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: errMsg
    });
  });
  $scope.hotholdForm={};
  };

})//HotholdCtrl

.controller('FridgeCtrl', function($scope, AuthService, $timeout, $ionicPopup, $state, $ionicLoading, $cordovaCamera) {

    $scope.fridge={};

    $scope.$on('$ionicView.enter', function(){

    console.log("get Fridges");
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

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            cameraDirection: 1,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.toggle=true;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.submit = function() {
    AuthService.fridge($scope.fridge).then(function(msg) {

    var alertPopup = $ionicPopup.alert({
      title: 'Success!',
      template: msg
      });
   }, function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: errMsg
    });
  });

  $scope.fridge={};

  };


})//FridgeCtrl

.controller('TrainingCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.trainingForm = {};

    $scope.submit = function() {
    AuthService.training($scope.trainingForm).then(function(msg) {
     //redirect to home??
      //$state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: msg
        });
     }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: errMsg
      });
    });

    $scope.trainingForm={};
  };

})//TrainingCtrl

.controller('TransportCtrl', function($scope, AuthService, $ionicLoading, $timeout, $ionicPopup, $state) {

  $scope.transportForm={};

  $scope.$on('$ionicView.enter', function(){

    console.log("get food and suppliers");
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

  $scope.submit = function() {
  AuthService.transport($scope.transportForm).then(function(msg) {
   //redirect to home??
    //$state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Success!',
      template: msg
      });
   }, function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: errMsg
    });
  });

  $scope.transportForm={};

  };

})//TransportCtrl

.controller('SettingsCtrl', function($scope, $timeout, AuthService, $ionicLoading, $ionicPopup, $state, $ionicListDelegate) {
  //console.log("Start SettingsCtrl");
  $scope.suppliersSelect=false;
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.refridgerationSelect=false;
  $scope.foodSelect=false;

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
          if(supplierData == undefined)
          {
            //console.log("undefined");
          }
          supplierData = ('supplierData: ', JSON.parse(supplierData));
          //console.log("create supplier "+supplierData);
          $scope.suppliers = supplierData;

          //console.log("get fridges");
          AuthService.getRefridgerators();
          var fridgeData = window.localStorage.getItem('FridgeData');
          fridgeData = JSON.parse(fridgeData);
          //console.log(fridgeData);
          $scope.units = fridgeData;

          //console.log("get foods");
          AuthService.getFood();
          var foodData = window.localStorage.getItem('FoodData');
          foodData = ('foodData: ', JSON.parse(foodData));
          //console.log(foodData);
          $scope.foods = foodData;






  //open/close Suppliers menu
  $scope.openSuppliers = function(){

      if($scope.suppliersSelect==true){
        $scope.suppliersSelect=false;
      }
      else{
        $scope.suppliersSelect=true;
      }
  }
  //add new supplier to suppliers array
  $scope.addSupplier = function(supplier) {

    if(supplierData.Supplier1 == undefined){
        supplierData.Supplier1=supplier;
      }
      else if(supplierData.Supplier2 == undefined){
        supplierData.Supplier2=supplier;
      }
      else if(supplierData.Supplier3 == undefined){
        supplierData.Supplier3=supplier;
      }
      else if(supplierData.Supplier4 == undefined){
        supplierData.Supplier4=supplier;
      }
      else if(supplierData.Supplier5 == undefined){
        supplierData.Supplier5=supplier;
      }
      else if(supplierData.Supplier6 == undefined){
        supplierData.Supplier6=supplier;
      }
      else if(supplierData.Supplier7 == undefined){
        supplierData.Supplier7=supplier;
      }
      else if(supplierData.Supplier8 == undefined){
        supplierData.Supplier8=supplier;
      }
      else if(supplierData.Supplier9 == undefined){
        supplierData.Supplier9=supplier;
      }
      else if(supplierData.Supplier10 == undefined){
        supplierData.Supplier10=supplier;
      }
  };

  //edit existing supplier
  $scope.editSupplier = function(key) {

     showPopupSupplier(key);

    $ionicListDelegate.closeOptionButtons();


  };

  showPopupSupplier = function(key) {
   //variable for text input
    $scope.suppliername={};
    // custom popup with user instructions. Has Cancel and Save buttons
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="suppliername.name">',
      title: 'Enter Supplier Name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.suppliername) {
              //don't allow the user to save if text has not been entered
              e.preventDefault();
            } else {

               if(key == "Supplier1"){
                  supplierData.Supplier1=$scope.suppliername.name;
                }
                else if(key == "Supplier2"){
                  supplierData.Supplier2=$scope.suppliername.name;
                }
                else if(key == "Supplier3"){
                  supplierData.Supplier3=$scope.suppliername.name;
                }
                else if(key == "Supplier4"){
                  supplierData.Supplier4=$scope.suppliername.name;
                }
                else if(key == "Supplier5"){
                  supplierData.Supplier5=$scope.suppliername.name;
                }
                else if(key == "Supplier6"){
                  supplierData.Supplier6=$scope.suppliername.name;
                }
                else if(key == "Supplier7"){
                  supplierData.Supplier7=$scope.suppliername.name;
                }
                else if(key == "Supplier8"){
                  supplierData.Supplier8=$scope.suppliername.name;
                }
                else if(key == "Supplier9"){
                  supplierData.Supplier9=$scope.suppliername.name;
                }
                else if(key == "Supplier10"){
                  supplierData.Supplier10=$scope.suppliername.name;
                }
                $scope.suppliername={};

            }
          }
        },
        ]
      })
  }



  //delete selected supplier (slide selection and delete)
  $scope.deleteSupplier = function(key) {

   if(key == "Supplier1"){
      delete supplierData.Supplier1;
      supplierData.Supplier1=undefined;
    }
    else if(key == "Supplier2"){
      delete supplierData.Supplier2;
      supplierData.Supplier2=undefined;
    }
    else if(key == "Supplier3"){
      delete supplierData.Supplier3;
      supplierData.Supplier3=undefined;
    }
    else if(key == "Supplier4"){
      delete supplierData.Supplier4;
      supplierData.Supplier4=undefined;
    }
    else if(key == "Supplier5"){
      delete supplierData.Supplier5;
      supplierData.Supplier5=undefined;
    }
    else if(key == "Supplier6"){
      delete supplierData.Supplier6;
      supplierData.Supplier6=undefined;
    }
    else if(key == "Supplier7"){
      delete supplierData.Supplier7;
      supplierData.Supplier7=undefined;
    }
    else if(key == "Supplier8"){
      delete supplierData.Supplier8;
      supplierData.Supplier8=undefined;
    }
    else if(key == "Supplier9"){
      delete supplierData.Supplier9;
      supplierData.Supplier9=undefined;
    }
    else if(key == "Supplier10"){
      delete supplierData.Supplier10;
      supplierData.Supplier10=undefined;
    }

    $ionicListDelegate.closeOptionButtons();

  };

  //open/close Refridgeration menu
  $scope.openRefridgeration = function(){

      if($scope.refridgerationSelect==true){
        $scope.refridgerationSelect=false;
      }
      else{
        $scope.refridgerationSelect=true;
      }
  }
  //add new unit to (refridgeration) units array
  $scope.addUnit = function(unit) {

      if(fridgeData.Fridge1 == undefined){
        fridgeData.Fridge1=unit;
      }
      else if(fridgeData.Fridge2 == undefined){
        fridgeData.Fridge2=unit;
      }
      else if(fridgeData.Fridge3 == undefined){
        fridgeData.Fridge3=unit;
      }
      else if(fridgeData.Fridge4 == undefined){
        fridgeData.Fridge4=unit;
      }
      else if(fridgeData.Fridge5 == undefined){
        fridgeData.Fridge5=unit;
      }
      else if(fridgeData.Fridge6 == undefined){
        fridgeData.Fridge6=unit;
      }

  };

  //edit existing unit
  $scope.editUnit = function(key) {

     showPopupFridge(key);

    $ionicListDelegate.closeOptionButtons();

  };

  showPopupFridge = function(key) {
   //variable for text input
    $scope.fridgename={};
    // custom popup with user instructions. Has Cancel and Save buttons
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="fridgename.name">',
      title: 'Enter Fridge Name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.fridgename) {
              //don't allow the user to save if text has not been entered
              e.preventDefault();
            } else {

               if(key == "Fridge1"){
                  fridgeData.Fridge1=$scope.fridgename.name;
                }
                else if(key == "Fridge2"){
                  fridgeData.Fridge2=$scope.fridgename.name;
                }
                else if(key == "Fridge3"){
                  fridgeData.Fridge3=$scope.fridgename.name;
                }
                else if(key == "Fridge4"){
                  fridgeData.Fridge4=$scope.fridgename.name;
                }
                else if(key == "Fridge5"){
                  fridgeData.Fridge5=$scope.fridgename.name;
                }
                else if(key == "Fridge6"){
                  fridgeData.Fridge6=$scope.fridgename.name;
                }

                $scope.fridgename={};

            }
          }
        },
        ]
      })
  }
  //delete selected unit (slide selection and delete)
  $scope.deleteUnit = function(key) {

    if(key == "Fridge1"){
      delete fridgeData.Fridge1;
      fridgeData.Fridge1=undefined;
    }
    else if(key == "Fridge2"){
      delete fridgeData.Fridge2;
      fridgeData.Fridge2=undefined;
    }
    else if(key == "Fridge3"){
      delete fridgeData.Fridge3;
      fridgeData.Fridge3=undefined;
    }
    else if(key == "Fridge4"){
      delete fridgeData.Fridge4;
      fridgeData.Fridge4=undefined;
    }
    else if(key == "Fridge5"){
      delete fridgeData.Fridge5;
      fridgeData.Fridge5=undefined;
    }
    else if(key == "Fridge6"){
      delete fridgeData.Fridge6;
      fridgeData.Fridge6=undefined;
    }

    $ionicListDelegate.closeOptionButtons();
  };



  //open/close Food menu
  $scope.openFood = function(){

      if($scope.foodSelect==true){
        $scope.foodSelect=false;
      }
      else{
        $scope.foodSelect=true;
      }
  }

    $scope.addFood = function(food) {

    if(foodData.Food1 == undefined){
        foodData.Food1=food;
      }
      else if(foodData.Food2 == undefined){
        foodData.Food2=food;
      }
      else if(foodData.foodData3 == undefined){
        foodData.Food3=food;
      }
      else if(foodData.Food4 == undefined){
        foodData.Food4=food;
      }
      else if(foodData.Food5 == undefined){
        foodData.Food5=food;
      }
      else if(foodData.Food6 == undefined){
        foodData.Food6=food;
      }
      else if(foodData.Food7 == undefined){
        foodData.Food7=food;
      }
      else if(foodData.Food8 == undefined){
        foodData.Food8=food;
      }
      else if(foodData.Food9 == undefined){
        foodData.Food9=food;
      }
      else if(foodData.Food10 == undefined){
        foodData.Food10=food;
      }

      console.log("addfood");
      console.log(foodData);

  };

  //edit existing food
  $scope.editFood = function(key) {

     showPopupFood(key);

    $ionicListDelegate.closeOptionButtons();

  };

  showPopupFood = function(key) {
   //variable for text input
    $scope.foodstuffname={};
    // custom popup with user instructions. Has Cancel and Save buttons
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="foodstuffname.name">',
      title: 'Enter Food Name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.foodstuffname) {
              //don't allow the user to save if text has not been entered
              e.preventDefault();
            } else {

               if(key == "Food1"){
                  foodData.Food1=$scope.foodstuffname.name;
                }
                else if(key == "Food2"){
                  foodData.Food2=$scope.foodstuffname.name;
                }
                else if(key == "Food3"){
                  foodData.Food3=$scope.foodstuffname.name;
                }
                else if(key == "Food4"){
                  foodData.Food4=$scope.foodstuffname.name;
                }
                else if(key == "Food5"){
                  foodData.Food5=$scope.foodstuffname.name;
                }
                else if(key == "Food6"){
                  foodData.Food6=$scope.foodstuffname.name;
                }
                else if(key == "Food7"){
                  foodData.Food7=$scope.foodstuffname.name;
                }
                else if(key == "Food8"){
                  foodData.Food8=$scope.foodstuffname.name;
                }
                else if(key == "Food9"){
                  foodData.Food9=$scope.foodstuffname.name;
                }
                else if(key == "Food10"){
                  foodData.Food10=$scope.foodstuffname.name;
                }

                $scope.foodstuffname={};
                console.log("editfood");
                console.log(foodData);

            }
          }
        },
        ]
      })
  }

  $scope.submitFridges = function() {

    //console.log(fridgeData);

    if(fridgeData){
      AuthService.putRefridgerators(fridgeData).then(function(msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Successfully Updated Fridges!',
          template: msg
          });
       }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error Updating Fridges',
          template: errMsg
        });
      });
    }

  };


  //delete selected food (slide selection and delete)
  $scope.deleteFood = function(key) {

   if(key == "Food1"){
      delete foodData.Food1;
      foodData.Food1=undefined;
    }
    else if(key == "Food2"){
      delete foodData.Food2;
      foodData.Food2=undefined;
    }
    else if(key == "Food3"){
      delete foodData.Food3;
      foodData.Food3=undefined;
    }
    else if(key == "Food4"){
      delete foodData.Food4;
      foodData.Food4=undefined;
    }
    else if(key == "Food5"){
      delete foodData.Food5;
      foodData.Food5=undefined;
    }
    else if(key == "Food6"){
      delete foodData.Food6;
      foodData.Food6=undefined;
    }
    else if(key == "Food7"){
      delete foodData.Food7;
      foodData.Food7=undefined;
    }
    else if(key == "Food8"){
      delete foodData.Food8;
      foodData.Food8=undefined;
    }
    else if(key == "Food9"){
      delete foodData.Food9;
      foodData.Food9=undefined;
    }
    else if(key == "Food10"){
      delete foodData.Food10;
      foodData.Food10=undefined;
    }

    $ionicListDelegate.closeOptionButtons();

    console.log("deletefood");
    console.log(foodData);

  };

  //when page is entered
  $scope.$on('$ionicView.beforeEnter', function(){
    //calls server for settings
    //AuthService.getSettings();

    console.log("before entering settings");
  //////  AuthService.getRefridgerators();
//AuthService.getSuppliers();
    //AuthService.getFood();

    console.log("Leaving beforeenter");

  });

  //when page is exited
  $scope.$on('$ionicView.beforeLeave', function(){

    // loader icon show while data is being retrieved using ionic service $ionicLoading
        $scope.loading = $ionicLoading.show({
          content: '<i class="icon ion-loading-c"></i>',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 50,
          showDelay: 0
        })

    //console.log("before leave");
    //console.log(fridgeData);
    //console.log(supplierData);
    //console.log(foodData);

    //Push settings if changed
    //AuthService.putRefridgerators(fridgeData);
    //AuthService.putSuppliers(supplierData);
    //AuthService.putFood(foodData);
    //console.log("put settings");
    //console.log(fridgeData);
    //console.log(supplierData);
    //console.log(foodData);

    $timeout(function () {
      $ionicLoading.hide();
    }, 2000);



  });

console.log("leaving SettingsCtrl");
})//SettingsCtrl

.controller('HomeCtrl', function($scope, $ionicSideMenuDelegate) {
  //home controller
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})



.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };


});
