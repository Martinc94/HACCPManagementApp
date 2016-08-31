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


  //prints formData array to DOM console after form is filled and submitted
  $scope.submitForm = function(formData) {
    console.log($scope.formData.q1);
    console.log($scope.formData.q2);
    console.log($scope.formData.q3);
    console.log($scope.formData.q4);
    console.log($scope.formData.q5);
    console.log($scope.formData.q6);
    console.log($scope.formData.q7);
    console.log($scope.formData.q8);
    console.log($scope.formData.q9);
    console.log($scope.formData.q10);
    console.log($scope.formData.q11);
    console.log($scope.formData.q12);
  };

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
 $scope.formData = [];
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
      $scope.formData.push(
      "q" + i + " " + selection
    );
    }

  }//selectChoice

  //when submit button is clicked at bottom of page, send signData answers
  $scope.submitForm=function(signData){
    //push signature details to array
    $scope.formData.push(
      $scope.signData.name + " " + $scope.signData.position + " " + $scope.signData.sign + " " + $scope.signData.date + " " + $scope.signData.frequency
    );
    //for testing only
    for(j=0; j<i+1; j++){
     console.log($scope.formData[j]);
      }
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



})//HygieneCtrl

.controller('DeliveryCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.deliveryForm={};

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
    console.log($scope.deliveryForm.checkon);
    console.log($scope.deliveryForm.managersign);
  }//submitForm




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




  //prints formData array to DOM console after form is filled and submitted
  $scope.submitForm = function(cookcoolForm) {

    /* Testing
    console.log($scope.cookcoolForm.date);
    console.log($scope.cookcoolForm.food);
    console.log($scope.cookcoolForm.startTime);
    console.log($scope.cookcoolForm.finishTime);
    console.log($scope.cookcoolForm.cookTemp);
    console.log($scope.cookcoolForm.cookSign);
    console.log($scope.cookcoolForm.fridgeTime);
    console.log($scope.cookcoolForm.coolSign);
    console.log($scope.cookcoolForm.reheatTemp);
    console.log($scope.cookcoolForm.reheatSign);
    console.log($scope.cookcoolForm.comment);
    console.log($scope.cookcoolForm.checkon);
    console.log($scope.cookcoolForm.managersign);*/
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

  //prints formData array to DOM console after form is filled and submitted
  $scope.submitForm = function(hotholdForm) {

    /*Testing
    console.log($scope.hotholdForm.date);
    console.log($scope.hotholdForm.food);
    console.log($scope.hotholdForm.time);
    console.log($scope.hotholdForm.firstTemp);
    console.log($scope.hotholdForm.secondTemp);
    console.log($scope.hotholdForm.thirdTemp);
    console.log($scope.hotholdForm.comment);
    console.log($scope.hotholdForm.sign);
    console.log($scope.hotholdForm.checkon);
    console.log($scope.hotholdForm.managersign);*/
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


  //prints formData array to DOM console after form is filled and submitted
  $scope.submitForm = function(trainingForm) {
    console.log($scope.trainingForm.name);
    console.log($scope.trainingForm.position);
    console.log($scope.trainingForm.dateEmp);
    console.log($scope.trainingForm.type);
    console.log($scope.trainingForm.date);
    console.log($scope.trainingForm.trainer);
    console.log($scope.trainingForm.empsign);
    console.log($scope.trainingForm.furthertraining);
    console.log($scope.trainingForm.provider);
    console.log($scope.trainingForm.furtherdate);
    console.log($scope.trainingForm.empsignfurther);
    console.log($scope.trainingForm.empsignfurther);
  };

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
  };

})//TrainingCtrl

.controller('TransportCtrl', function($scope, AuthService, $ionicPopup, $state) {

  $scope.transportForm={};

  $scope.submitForm=function(transportForm){
    // Testing
    console.log($scope.transportForm.date);
    console.log($scope.transportForm.food);
    console.log($scope.transportForm.batch);
    console.log($scope.transportForm.customer);
    console.log($scope.transportForm.separation);
    console.log($scope.transportForm.temp);
    console.log($scope.transportForm.comment);
    console.log($scope.transportForm.sign);
    console.log($scope.transportForm.checkon);
    console.log($scope.transportForm.managersign);

  }//submitForm

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
