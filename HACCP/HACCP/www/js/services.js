angular.module('starter.services', [])

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

    var forgot = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/forgot', user).then(function(result) {
        console.log(user);
          if (result.data.success) {
            //storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var fitness = function(formData) {
       return $q(function(resolve, reject) {
         $http.post(API_ENDPOINT.url + '/fitnessToWork', formData).then(function(result) {
         console.log(formData);
           if (result.data.success) {
             //

             resolve(result.data.msg);
           } else {
             reject(result.data.msg);
           }
         });
       });
     };

    var training = function(trainingForm) {
       return $q(function(resolve, reject) {
         $http.post(API_ENDPOINT.url + '/hygieneTraining', trainingForm).then(function(result) {
         console.log(trainingForm);
           if (result.data.success) {
             //

             resolve(result.data.msg);
           } else {
             reject(result.data.msg);
           }
         });
       });
     };

    var transport = function(transportForm) {
        return $q(function(resolve, reject) {
          $http.post(API_ENDPOINT.url + '/transport', transportForm).then(function(result) {
          console.log(transportForm);
            if (result.data.success) {
              //

              resolve(result.data.msg);
            } else {
              reject(result.data.msg);
            }
          });
        });
      };

    var getSettings = function() {
         return $q(function(resolve, reject) {
           $http.get(API_ENDPOINT.url + '/settings').then(function(resp) {
             if (resp.data.success) {
               //console.log('Success', resp);

               console.log(resp.data.msg);
               console.log(resp.data.Nofridges);

               //save to localStorage


             }//end if

           });
         });
       };

    var hothold = function(hotholdForm) {
          return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/hothold', hotholdForm).then(function(result) {
            console.log(hotholdForm);
              if (result.data.success) {
                //

                resolve(result.data.msg);
              } else {
                reject(result.data.msg);
              }
            });
          });
        };

    var temperature = function(cookcoolForm) {
           return $q(function(resolve, reject) {
             $http.post(API_ENDPOINT.url + '/temperature', cookcoolForm).then(function(result) {
             console.log(cookcoolForm);
               if (result.data.success) {
                 //

                 resolve(result.data.msg);
               } else {
                 reject(result.data.msg);
               }
             });
           });
         };

    var hygieneInspection = function(signData,fData) {
          return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/hygieneInspection', fData,signData).then(function(result) {
            //console.log(signData,formData);
            //console.log(fData.question);
            //console.log(signData);
              if (result.data.success) {
                //

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
      forgot: forgot,
      logout: logout,
      fitness: fitness,
      training: training,
      transport:transport,
      getSettings:getSettings,
      hothold:hothold,
      temperature:temperature,
      hygieneInspection:hygieneInspection,
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
        //console.log("Not authenticated");
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

//end AUTH
