angular.module('starter.controllers', ['ionic.wheel'])

//Auth controllers
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('tab.home');
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


//end Auth controllers

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

//controller for Fitness to Work Assessment Page
.controller('FittCtrl', function($scope) {
   
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

})



.controller('HomeCtrl', function($scope) {

})


.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
        $state.go('main');
    };
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
})

.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function(){
        $state.go('intro');
    }



})
//hygiene page controller
.controller('ListCtrl', function($scope, $ionicPopup){
  
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



})//ListCtrl


.controller('DeliveryCtrl', function($scope) {
  
  $scope.submitForm=function(deliveryForm){
    //push signature details to array
    /*$scope.formData.push(
      $scope.signData.name + " " + $scope.signData.position + " " + $scope.signData.sign + " " + $scope.signData.date + " " + $scope.signData.frequency
    );
    //for testing only
    for(j=0; j<i+1; j++){
     console.log($scope.formData[j]);
      }*/
  }//submitForm

  


})

.controller('TemperatureCtrl', function($scope, ionicTimePicker) {
  
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

  
  

  

})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };


});


