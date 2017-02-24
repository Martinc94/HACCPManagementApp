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

    function isLoggedIn() {
      var isLogged=false;
      try {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
          //useCredentials(token);
          isLogged=true;
          //return true;
        }
        else{
        //  return false;
        isLogged=false;
        }
      }
      catch(err) {
        isLogged=false;
      }
      return isLogged;
    }//end isLogged

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
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
        //$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
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
            if (result.data.success) {
              resolve(result.data.msg);
            } else {
              reject(result.data.msg);
            }
          });
        });
      };

    var hothold = function(hotholdForm) {
          return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/hothold', hotholdForm).then(function(result) {
            console.log(hotholdForm);
              if (result.data.success) {
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
                 resolve(result.data.msg);
               } else {
                 reject(result.data.msg);
               }
             });
           });
         };

    var hygieneInspection = function(formData) {
          return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/hygieneInspection', formData).then(function(result) {
            console.log(formData);

              if (result.data.success) {
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
             }//end if

           });
         });
       };

    var putSettings = function(settings) {
          return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/settings', settings).then(function(result) {
              if (result.data.success) {
                resolve(result.data.msg);
              } else {
                reject(result.data.msg);
              }
            });
          });
        };

    var getRefridgerators = function() {
         return $q(function(resolve, reject) {
           $http.get(API_ENDPOINT.url + '/refridgerationUnit').then(function(resp) {
             if (resp.status!==200) {
                 console.log("Ref Error");
                 console.log("Ref msg"+resp.status.msg);
                 console.log("Ref Status"+resp.status);
             }
             if (resp.status==200) {
                window.localStorage.setItem( 'FridgeData', JSON.stringify(resp.data));
             }//end if

           });
         });
       };

    var putRefridgerators = function(units) {
           return $q(function(resolve, reject) {
             $http.put(API_ENDPOINT.url + '/refridgerationUnit', units).then(function(result) {
               if (result.data.success) {
                 console.log(result.data.msg);
                 resolve(result.data.msg);
               } else {
                 reject(result.data.msg);
                 console.log(result.data.msg);
               }
             });
           });
         };

    var getSuppliers = function() {
        return $q(function(resolve, reject) {
          $http.get(API_ENDPOINT.url + '/suppliers').then(function(respS) {
          if (respS.status!==200) {
              console.log("Suppliers Error");
              console.log(respS.status.msg);
          }
          if (respS.status==200) {
              window.localStorage.setItem( 'SupplierData', JSON.stringify(respS.data));
            }//end if

          });
        });
      };

    var putSuppliers = function(suppliers) {
          return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/suppliers', suppliers).then(function(result) {
              if (result.data.success) {
                resolve(result.data.msg);
              } else {
                reject(result.data.msg);
                console.log(result.data.msg);
              }
            });
          });
        };

    var getFood = function() {
        return $q(function(resolve, reject) {
          $http.get(API_ENDPOINT.url + '/food').then(function(resp) {
            if (resp.status!==200) {
                console.log("Food Error");
                console.log(resp.status.msg);
            }
            if (resp.status==200) {
                window.localStorage.setItem( 'FoodData', JSON.stringify(resp.data));
            }//end if

          });
        });
      };

    var putFood = function(food) {
      console.log("services.putFood");
      console.log(food);
          return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/food', food).then(function(result) {
              if (result.data.success) {
                  console.log(result.data.msg);
                resolve(result.data.msg);
              } else {
                reject(result.data.msg);
                console.log(result.data.msg);
              }
            });
          });
      };

    var foodDelivery = function(formData) {
          return $q(function(resolve, reject) {
              $http.post(API_ENDPOINT.url + '/foodDelivery', formData).then(function(result) {
                if (result.data.success) {
                  resolve(result.data.msg);
                } else {
                  reject(result.data.msg);
                }
              });
          });
    };

    var fridge = function(fridge) {
        return $q(function(resolve, reject) {
          $http.post(API_ENDPOINT.url + '/fridgetemp', fridge).then(function(result) {
          console.log(fridge);
            if (result.data.success) {
              resolve(result.data.msg);
            } else {
              reject(result.data.msg);
            }
          });
        });
    };

    var postPhoto = function(deliveryForm,imageData) {
      return $q(function(resolve, reject) {
        var formData = new FormData();

        if(imageData != undefined){
          formData.append('photo',imageData);
          formData.append('photoComment',deliveryForm.photoComment);
        }

        formData.append('date',deliveryForm.date);
        formData.append('food',deliveryForm.food);
        formData.append('batchCode',deliveryForm.batchCode);
        formData.append('supplier',deliveryForm.supplier);
        formData.append('useBy',deliveryForm.useBy);
        formData.append('temp',deliveryForm.temp);
        formData.append('vehicleCheck',deliveryForm.vehicleCheck);
        formData.append('comment',deliveryForm.comment);
        formData.append('sign',deliveryForm.sign);
        formData.append('lat',deliveryForm.lat);
        formData.append('long',deliveryForm.long);

          $http({
             url: API_ENDPOINT.url+"/foodDelivery",
             method: "POST",
             data: formData,
             headers: {"Content-Type": undefined}
          //}).then((result) => {
          //}).then(function(result) => {
          }).then(function(result) {
             //console.log("success");
             resolve(result.data.msg);
          //}).catch(() => {
          }).catch(function(){
             console.log("error");
             reject(result.data.msg);
          });
      });
    };//end postPhoto

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
      putSettings:putSettings,
      getRefridgerators:getRefridgerators,
      putRefridgerators:putRefridgerators,
      getSuppliers:getSuppliers,
      putSuppliers:putSuppliers,
      getFood:getFood,
      putFood:putFood,
      fridge: fridge,
      foodDelivery:foodDelivery,
      postPhoto:postPhoto,
      isLoggedIn:isLoggedIn,
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
    $httpProvider.interceptors.push('AuthInterceptor');
  })//;
//end AUTH

.service('LocationService', function($q,$cordovaGeolocation) {
    var getLocation = function() {
          return $q(function(resolve, reject) {
            var loc = {}
            var lat;
            var long;

            $cordovaGeolocation.getCurrentPosition().then(function(position) {
               lat  = position.coords.latitude
               long = position.coords.longitude

               loc.lat=lat;
               loc.long=long;

               resolve(loc);

            }, function(err) {
              // Error
              console.log("GPS Error");
              loc.lat=0;
              loc.long=0;
              reject(loc);
           });
        });
      };

    return {
      getLocation: getLocation,
    };
  })//end LocationService

  .service('DataService', function($q,$cordovaNetwork,$rootScope) {
      var connectionStatus = function() {
            return $q(function(resolve, reject) {

              try{
                  var isOffline = $cordovaNetwork.isOffline();

                    if(isOffline){
                      resolve("offline");
                    }

                    var isOnline = $cordovaNetwork.isOnline();

                    if(isOnline){
                      resolve("online");
                    }
                }
                catch(err) {
                    resolve("offline");
                }
          });
        };

      return {
        connectionStatus: connectionStatus,
      };
    })//end dataService

    .service('StorageService', function($q,$http, API_ENDPOINT) {
        var storeForm = function(Form,name) {
                var Forms = [];

                //load array
                var Forms = JSON.parse(localStorage.getItem(name));

                //if empty array
                if(Forms == undefined)
                {
                  Forms = [];
                  Forms[0] = JSON.stringify(Form);
                }
                else{
                  //add to array
                  Forms[Forms.length] = JSON.stringify(Form);
                }

                //save array
                localStorage.setItem(name, JSON.stringify(Forms));
          };//end storeForm

          var postForms = function(name,url) {
            return $q(function(resolve, reject) {
                  var Forms = [];
                  var Form = {};

                  //load array
                  var Forms = JSON.parse(localStorage.getItem(name));

                  //if empty array
                  if(Forms == undefined)
                  {
                    //alert no forms
                    resolve("No Forms saved!");
                  }
                  else{
                    //attempt to post or return form and remove

                    var promises = [];
                      for(var i = 0; i < Forms.length; i++) {

                        form = Forms[i];

                        var promise =$http.post(API_ENDPOINT.url + '/'+url, form);

                      	promises.push(promise);
                      }//end for

                     $q.all(promises).then(function(results) {
                      // console.log(results);

                       for(var j = Forms.length; j > 0; j--) {

                        if (results[j-1].data.success) {
                          console.log("Removing: "+Forms[j-1]);

                          Forms.splice(j-1, 1);

                          //resolve(result.data.msg);
                        }
                        else {
                          //invalid form
                          //leave in array
                          console.log("Invalid: "+Forms[j-1]);
                        }//end else

                      }//end for

                      //console.log(Forms);
                      if(Forms.length==0){
                        //remove forms
                        localStorage.removeItem(name);
                        resolve("All forms posted successfully");
                      }
                      else{
                        //save Forms
                        localStorage.setItem(name, JSON.stringify(Forms));
                        reject("Some forms unable to post");
                      }

                  });//end q.all(promises)

                }//end else

              });
            };//end postForms

        return {
          storeForm: storeForm,
          postForms: postForms,
        };
      });
      //end StorageService
