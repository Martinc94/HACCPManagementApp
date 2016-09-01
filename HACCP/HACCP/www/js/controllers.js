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

.controller('MenuCtrl', function($scope) {

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

 //variable for page data to be sent to server
 //$scope.formData = [];

 $scope.fData = {};
 $scope.fData.question = [];
 //variable for manager signing details
 $scope.signData = {};
 //controls question number
 var i=0;

  //function for yes/no selection
 $scope.selectChoice=function(selection){
    //increment i for every question answered
    i++;
    //if user selects No, show popup for corrective action input
    if(selection=='No'){
      showPopup();
    }
    else{
      //if user selects Yes, push question number and answer to array
      /*$scope.formData.push(
      "q" + i + " " + selection
    );*/
      $scope.fData.question[i]="q" + i + " " + selection;
    }

    }//selectChoice

  //when submit button is clicked at bottom of page, send signData answers
  $scope.submitForm=function(){
    //push signature details to array

  }//submitForm

  //text input popup if user selects no to a question
 showPopup = function() {
  //variable for text input
   $scope.data = {}

   // custom popup with user instructions. Has Cancel and Save buttons
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="data.correctiveAction">',
     title: 'Enter Corrective Action',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.correctiveAction) {
             //don't allow the user to save if text has not been entered
             e.preventDefault();
           } else {
              //push the question number and corrective answer to the array
              $scope.formData.push(
                "q" + i + " No " + $scope.data.correctiveAction
              );
             return $scope.data.correctiveAction;
           }
         }
       },
     ]
   });

   //for testing
   /*myPopup.then(function(res) {
     console.log('Tapped!', res);
     for(j=0; j<i; j++){
     console.log($scope.arrayActions[j]);
      }
   });*/

  };//popup

  $scope.submit = function() {
  AuthService.hygieneInspection($scope.fData,$scope.signData).then(function(msg) {
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

  $scope.fData={};
  $scope.signData={};
  };



})//HygieneCtrl

.controller('DeliveryCtrl', function($scope, AuthService, $ionicPopup, $state, $cordovaCamera) {

  $scope.deliveryForm={};
  $scope.toggle=false;

  $scope.submitForm=function(deliveryForm){
    // Testing
    console.log($scope.deliveryForm.date);
    console.log($scope.deliveryForm.food);
    console.log($scope.deliveryForm.batch);
    console.log($scope.deliveryForm.supplier);
    console.log($scope.deliveryForm.useby);
    console.log($scope.deliveryForm.temp);
    console.log($scope.deliveryForm.vehicle);
    console.log($scope.deliveryForm.comment);
    console.log($scope.deliveryForm.sign);

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

  $scope.units=[{
    name: 'Fridge 1',
    temp: ''
  }, {
    name: 'Fridge 2',
    temp: ''
  }]




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
    AuthService.getSettings();
    AuthService.getRefridgerators();

  });

  //when page is exited
  $scope.$on('$ionicView.leave', function(){

    //AuthService.getSettings();
    console.log('Exiting Settings');
    //Push settings if changed
    //AuthService.putRefridgerators(units);
    var appData = window.localStorage.getItem( 'Fridge1' );
    console.log(appData);
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
