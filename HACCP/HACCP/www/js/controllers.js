angular.module('starter.controllers', ['ionic.wheel'])

//Auth controllers
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('app.hygiene');
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
      console.log("no 5");
      $scope.formData.q5=false;
    }
    if(!$scope.formData.q6){
      console.log("no 6");
      $scope.formData.q6=false;
    }
    if(!$scope.formData.q7){
      console.log("no 7");
      $scope.formData.q7=false;
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

.controller('DeliveryCtrl', function($scope, AuthService, $ionicPopup, $state, $cordovaCamera) {

  $scope.deliveryForm={};
  $scope.toggle=false;

  var supplierData = window.localStorage.getItem('SupplierData');
  supplierData = ('supplierData: ', JSON.parse(supplierData));
  $scope.suppliers = supplierData;

  var foodData = window.localStorage.getItem('FoodData');
  foodData = ('foodData: ', JSON.parse(foodData));
  $scope.foods = foodData;

  $scope.submitForm=function(deliveryForm){

  }//submitForm

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

.controller('TemperatureCtrl', function($scope, AuthService, $ionicPopup, $state, ionicTimePicker) {

  $scope.cookcoolForm = {};

  var foodData = window.localStorage.getItem('FoodData');
  foodData = ('foodData: ', JSON.parse(foodData));
  $scope.foods = foodData;

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

.controller('HotholdCtrl', function($scope, AuthService, $ionicPopup, $state, ionicTimePicker) {

  $scope.hotholdForm = {};

  var foodData = window.localStorage.getItem('FoodData');
  foodData = ('foodData: ', JSON.parse(foodData));
  $scope.foods = foodData;

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

.controller('FridgeCtrl', function($scope, AuthService, $ionicPopup, $state) {

    var fridgeData = window.localStorage.getItem('FridgeData');
    fridgeData = ('fridgeData: ', JSON.parse(fridgeData));
    $scope.units = fridgeData;

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

.controller('TransportCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.transportForm={};

  var foodData = window.localStorage.getItem('FoodData');
  foodData = ('foodData: ', JSON.parse(foodData));
  $scope.foods = foodData;

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

.controller('SettingsCtrl', function($scope, AuthService, $ionicPopup, $state, $ionicListDelegate) {

  $scope.suppliersSelect=false;
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.refridgerationSelect=false;
  $scope.foodSelect=false;
  //arrays to store information pulled from server and pushed to server

  //$scope.suppliers = window.localStorage.getItem('SupplierData');
/*  var supplierData = ('SupplierData: ', JSON.parse(supplierData));
  //$scope.suppliers = supplierData;
  console.log("supplierdata"+ supplierData)
  console.log("these are suppliers:" + $scope.suppliers);*/

  var fridgeData = window.localStorage.getItem('FridgeData');
  fridgeData = JSON.parse(fridgeData);
  $scope.units = fridgeData;

  var supplierData = window.localStorage.getItem('SupplierData');
  supplierData = ('supplierData: ', JSON.parse(supplierData));
  $scope.suppliers = supplierData;

  var foodData = window.localStorage.getItem('FoodData');
  foodData = ('foodData: ', JSON.parse(foodData));
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
    $scope.suppliers.push({
      name: supplier.name
    });
    supplier.name = "";
  };
  //delete selected supplier (slide selection and delete)
  $scope.deleteSupplier = function(supplier) {

    $scope.suppliers.splice($scope.suppliers.indexOf(supplier), 1);

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
      
      
  };

  //add new unit to (refridgeration) units array
  $scope.editUnit = function(key) {
    
     showPopup(key);
          
    $ionicListDelegate.closeOptionButtons();

  };

  showPopup = function(key) {
   //variable for text input
    console.log("hello popup");
    $scope.data={};
    // custom popup with user instructions. Has Cancel and Save buttons
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.name">',
      title: 'Enter Fridge Name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data) {
              //don't allow the user to save if text has not been entered
              e.preventDefault();
            } else {
              
               if(key == "Fridge1"){
                  fridgeData.Fridge1=$scope.data.name;
                }
                else if(key == "Fridge2"){
                  fridgeData.Fridge2=$scope.data.name;
                }
                else if(key == "Fridge3"){
                  fridgeData.Fridge3=$scope.data.name;
                }
                else if(key == "Fridge4"){
                  fridgeData.Fridge4=$scope.data.name;
                }
                else if(key == "Fridge5"){
                  fridgeData.Fridge5=$scope.data.name;
                }
                else if(key == "Fridge6"){
                  fridgeData.Fridge6=$scope.data.name;
                }

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
    }
    else if(key == "Fridge2"){
      delete fridgeData.Fridge2;
    }
    else if(key == "Fridge3"){
      delete fridgeData.Fridge3;
    }
    else if(key == "Fridge4"){
      delete fridgeData.Fridge4;
    }
    else if(key == "Fridge5"){
      delete fridgeData.Fridge5;
    }   
    else if(key == "Fridge6"){
      delete fridgeData.Fridge6;
    }   
    console.log(fridgeData);
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
  //add new food to foods array
  $scope.addFood = function(food) {
    $scope.foods.push({
      name: food.name
    });
    food.name = "";
  };
  //delete selected food (slide selection and delete)
  $scope.deleteFood = function(food) {

    $scope.foods.splice($scope.foods.indexOf(food), 1);

  };
  //when page is entered
  $scope.$on('$ionicView.enter', function(){
    //calls server for settings
    //AuthService.getSettings();
    AuthService.getRefridgerators();
    AuthService.getSuppliers();
    AuthService.getFood();

  });

  //when page is exited
  $scope.$on('$ionicView.leave', function(){

    //AuthService.getSettings();
    console.log('Exiting Settings');
    //Push settings if changed
    //AuthService.putRefridgerators(units);

    //var appData = window.localStorage.getItem( 'Fridge1' );
    //var appData2 = window.localStorage.getItem( 'Supplier1' );
    //var appData3 = window.localStorage.getItem( 'Food1' );
    //console.log(appData,appData2,appData3);

    var FridgeData = window.localStorage.getItem('FridgeData');
    console.log(JSON.parse(FridgeData));

    var SupplierData = window.localStorage.getItem('SupplierData');
    console.log(JSON.parse(SupplierData));

    var FoodData = window.localStorage.getItem('FoodData');
    console.log(JSON.parse(FoodData));
  });


})//SettingsCtrl

.controller('HomeCtrl', function($scope) {
  //home controller
})



.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };


});
