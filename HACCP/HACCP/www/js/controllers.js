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

.controller('ListCtrl', function($scope){
  $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;
 $scope.toggle=false;

 $scope.selectChoice=function(answer){

    $scope.toggle=true;
    this.answer=null;
}

  $scope.submit=function(){

    $scope.toggle=false;
}



})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };


});
