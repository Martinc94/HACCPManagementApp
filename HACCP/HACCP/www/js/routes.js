angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MenuCtrl'
       })

      .state('app.hygiene', {
            url: '/hygiene',
            views: {
              'menuContent': {
                templateUrl: 'templates/hygiene.html',
                controller: 'ListCtrl'
              }
            }
            
        })

      .state('app.delivery', {
            url: '/delivery',
            views: {
              'menuContent': {
                templateUrl: 'templates/delivery.html',
                controller: 'DeliveryCtrl'
              }
            }
            
        })

      .state('app.transport', {
            url: '/transport',
            views: {
              'menuContent': {
                templateUrl: 'templates/transport.html',
                controller: ''
              }
            }
            
        })

      .state('app.fitness', {
            url: '/fitness',
            views: {
              'menuContent': {
                templateUrl: 'templates/fitness.html',
                controller: 'FittCtrl'
              }
            }
            
        })

      .state('app.training', {
            url: '/training',
            views: {
              'menuContent': {
                templateUrl: 'templates/training.html',
                controller: ''
              }
            }
            
        })

      

      .state('app.hothold', {
            url: '/hothold',
            views: {
              'menuContent': {
                templateUrl: 'templates/hothold.html',
                controller: ''
              }
            }
            
        })

      .state('app.temperature', {
            url: '/temperature',
            views: {
              'menuContent': {
                templateUrl: 'templates/temperature.html',
                controller: ''
              }
            }
            
        })

      .state('app.refridgeration', {
            url: '/refridgeration',
            views: {
              'menuContent': {
                templateUrl: 'templates/refridgeration.html',
                controller: ''
              }
            }
            
        })



        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })

       .state('signup', {
           url: '/signup',
           templateUrl: 'templates/signup.html',
           controller: 'SignupCtrl'
       })

       .state('forgot', {
           url: '/forgot',
           templateUrl: 'templates/forgot.html',
           controller: 'ForgotCtrl'
       })

       

       


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
      url: '/home',
      views: {
          'tab-home': {
              templateUrl: 'templates/tab-home.html',
              controller: 'IntroCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        //controller: 'AccountCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/hygiene');
});