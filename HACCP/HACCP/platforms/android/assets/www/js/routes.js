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

      .state('app.home', {
            url: '/home',
            views: {
              'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
              }
            }

        })

      .state('app.hygiene', {
            url: '/hygiene',
            views: {
              'menuContent': {
                templateUrl: 'templates/hygiene.html',
                controller: 'HygieneCtrl'
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
                controller: 'TransportCtrl'
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
                controller: 'TrainingCtrl'
              }
            }

        })

      .state('app.hothold', {
            url: '/hothold',
            views: {
              'menuContent': {
                templateUrl: 'templates/hothold.html',
                controller: 'HotholdCtrl'
              }
            }

        })

      .state('app.temperature', {
            url: '/temperature',
            views: {
              'menuContent': {
                templateUrl: 'templates/temperature.html',
                controller: 'TemperatureCtrl'
              }
            }

        })

      .state('app.refridgeration', {
            url: '/refridgeration',
            views: {
              'menuContent': {
                templateUrl: 'templates/refridgeration.html',
                controller: 'FridgeCtrl'
              }
            }

        })

      .state('app.settings', {
          url: '/settings',
          views: {
              'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'SettingsCtrl'
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
