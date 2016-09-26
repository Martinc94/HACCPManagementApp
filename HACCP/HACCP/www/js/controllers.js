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

    var suppData1 = window.localStorage.getItem( 'Supplier1' );
    var suppData2 = window.localStorage.getItem( 'Supplier2' );
    var suppData3 = window.localStorage.getItem( 'Supplier3' );
    var suppData4 = window.localStorage.getItem( 'Supplier4' );
    var suppData5 = window.localStorage.getItem( 'Supplier5' );
    var suppData6 = window.localStorage.getItem( 'Supplier6' );
    var suppData7 = window.localStorage.getItem( 'Supplier7' );
    var suppData8 = window.localStorage.getItem( 'Supplier8' );
    var suppData9 = window.localStorage.getItem( 'Supplier9' );
    var suppData10 = window.localStorage.getItem( 'Supplier10' );


    $scope.suppliers = [{
      name: suppData1},
      {
      name: suppData2},
      {
      name: suppData3},
      {
      name: suppData4},
      {
      name: suppData5},
      {
      name: suppData6},
      {
      name: suppData7},
      {
      name: suppData8},
      {
      name: suppData9},
      {
      name: suppData10}];

    var foodData1 = window.localStorage.getItem( 'Food1' );
    var foodData2 = window.localStorage.getItem( 'Food2' );
    var foodData3 = window.localStorage.getItem( 'Food3' );
    var foodData4 = window.localStorage.getItem( 'Food4' );
    var foodData5 = window.localStorage.getItem( 'Food5' );
    var foodData6 = window.localStorage.getItem( 'Food6' );
    var foodData7 = window.localStorage.getItem( 'Food7' );
    var foodData8 = window.localStorage.getItem( 'Food8' );
    var foodData9 = window.localStorage.getItem( 'Food9' );
    var foodData10 = window.localStorage.getItem( 'Food10' );


    $scope.foodItems = [{
      name: foodData1},
      {
      name: foodData2},
      {
      name: foodData3},
      {
      name: foodData4},
      {
      name: foodData5},
      {
      name: foodData6},
      {
      name: foodData7},
      {
      name: foodData8},
      {
      name: foodData9},
      {
      name: foodData10}];

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

  var foodData1 = window.localStorage.getItem( 'Food1' );
    var foodData2 = window.localStorage.getItem( 'Food2' );
    var foodData3 = window.localStorage.getItem( 'Food3' );
    var foodData4 = window.localStorage.getItem( 'Food4' );
    var foodData5 = window.localStorage.getItem( 'Food5' );
    var foodData6 = window.localStorage.getItem( 'Food6' );
    var foodData7 = window.localStorage.getItem( 'Food7' );
    var foodData8 = window.localStorage.getItem( 'Food8' );
    var foodData9 = window.localStorage.getItem( 'Food9' );
    var foodData10 = window.localStorage.getItem( 'Food10' );


    $scope.foodItems = [{
      name: foodData1},
      {
      name: foodData2},
      {
      name: foodData3},
      {
      name: foodData4},
      {
      name: foodData5},
      {
      name: foodData6},
      {
      name: foodData7},
      {
      name: foodData8},
      {
      name: foodData9},
      {
      name: foodData10}];

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

  var foodData1 = window.localStorage.getItem( 'Food1' );
    var foodData2 = window.localStorage.getItem( 'Food2' );
    var foodData3 = window.localStorage.getItem( 'Food3' );
    var foodData4 = window.localStorage.getItem( 'Food4' );
    var foodData5 = window.localStorage.getItem( 'Food5' );
    var foodData6 = window.localStorage.getItem( 'Food6' );
    var foodData7 = window.localStorage.getItem( 'Food7' );
    var foodData8 = window.localStorage.getItem( 'Food8' );
    var foodData9 = window.localStorage.getItem( 'Food9' );
    var foodData10 = window.localStorage.getItem( 'Food10' );


    $scope.foodItems = [{
      name: foodData1},
      {
      name: foodData2},
      {
      name: foodData3},
      {
      name: foodData4},
      {
      name: foodData5},
      {
      name: foodData6},
      {
      name: foodData7},
      {
      name: foodData8},
      {
      name: foodData9},
      {
      name: foodData10}];

  $scope.openTimePicker=function(){

    var ipObj1 = {
    callback: function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      }
      else {
        var selectedTime = new Date(val * 1000);
        $scope.hotholdForm.time=selectedTime.getUTCHours() + 'H :' + selectedTime.getUTCMinutes() + 'M';
        //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');

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

  var foodData1 = window.localStorage.getItem( 'Food1' );
    var foodData2 = window.localStorage.getItem( 'Food2' );
    var foodData3 = window.localStorage.getItem( 'Food3' );
    var foodData4 = window.localStorage.getItem( 'Food4' );
    var foodData5 = window.localStorage.getItem( 'Food5' );
    var foodData6 = window.localStorage.getItem( 'Food6' );
    var foodData7 = window.localStorage.getItem( 'Food7' );
    var foodData8 = window.localStorage.getItem( 'Food8' );
    var foodData9 = window.localStorage.getItem( 'Food9' );
    var foodData10 = window.localStorage.getItem( 'Food10' );


    $scope.foodItems = [{
      name: foodData1},
      {
      name: foodData2},
      {
      name: foodData3},
      {
      name: foodData4},
      {
      name: foodData5},
      {
      name: foodData6},
      {
      name: foodData7},
      {
      name: foodData8},
      {
      name: foodData9},
      {
      name: foodData10}];

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

.controller('SettingsCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.suppliersSelect=false;
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.refridgerationSelect=false;
  $scope.foodSelect=false;
  //arrays to store information pulled from server and pushed to server
  $scope.suppliers=[];
  $scope.units=[];
  $scope.foods=[];

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
    $scope.units.push({
      name: unit.name
    });
    unit.name = "";
  };
  //delete selected unit (slide selection and delete)
  $scope.deleteUnit = function(unit) {

    $scope.units.splice($scope.units.indexOf(unit), 1);

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
