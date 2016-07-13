angular.module('starter.services', [])

    //LOGIN Service
    //hardcoded login
    /*.service('LoginService', function ($q) {
        return {
            loginUser: function (name, pw) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                if (name == 'user' && pw == 'secret') {
                    deferred.resolve('Welcome ' + name + '!');
                } else {
                    deferred.reject('Wrong credentials.');
                }
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            }
        }
    })*/

//AUTH SERVICE
.service('AuthService', function($q, $http, API_ENDPOINT) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };



    loadUserCredentials();

   return {
      login: login,
      register: register,
      logout: logout,
      isAuthenticated: function() {return isAuthenticated;},
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    //causes error
    //$httpProvider.interceptors.push('AuthInterceptor');
  });



//end AUTH














/*.factory('Foods', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var food = [{
    id: 0,
    type: 'Meat',
  }, {
    id: 1,
    type: 'Veg',
  }, {
    id: 2,
    type: 'Dry Store',
  }, {
    id: 3,
    type: 'Dairy',
  }, {
    id: 4,
    type: 'Fish',
  }];

  return {
    all: function() {
      return food;
    },
    remove: function(foods) {
        food.splice(food.indexOf(foods), 1);
    },
    get: function(foodId) {
      for (var i = 0; i < food.length; i++) {
          if (food[i].id === parseInt(foodId)) {
          return food[i];
        }
      }
      return null;
    }
  };
});*/
