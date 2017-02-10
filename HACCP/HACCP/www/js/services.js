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
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        //useCredentials(token);
        return true;
      }
      else{
        return false;
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
            //console.log(transportForm);
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

    var hygieneInspection = function(formData) {
          return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/hygieneInspection', formData).then(function(result) {
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

    var putSettings = function(settings) {
          return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/settings', settings).then(function(result) {
            console.log(settings);
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
             //if (resp.data.success) {

             if (resp.status!==200) {
                 console.log("Ref Error");
                 console.log("Ref msg"+resp.status.msg);
                 console.log("Ref Status"+resp.status);
             }
             if (resp.status==200) {
              // console.log("Ref Success");

               /*console.log(resp.data.msg);
               console.log(resp.data.Fridge1);
               console.log(resp.data.Fridge2);
               console.log(resp.data.Fridge3);
               console.log(resp.data.Fridge4);
               console.log(resp.data.Fridge5);
               console.log(resp.data.Fridge6);*/

               //console.log(resp.data);

               //save to localStorage
              /* window.localStorage.setItem( 'Fridge1', resp.data.Fridge1 );
               window.localStorage.setItem( 'Fridge2', resp.data.Fridge2 );
               window.localStorage.setItem( 'Fridge3', resp.data.Fridge3 );
               window.localStorage.setItem( 'Fridge4', resp.data.Fridge4 );
               window.localStorage.setItem( 'Fridge5', resp.data.Fridge5 );
               window.localStorage.setItem( 'Fridge6', resp.data.Fridge6 );*/

               window.localStorage.setItem( 'FridgeData', JSON.stringify(resp.data));


             }//end if

           });
         });
       };

    var putRefridgerators = function(units) {
      //console.log("services.putRefridgerators");
      //console.log(units);
           return $q(function(resolve, reject) {
             $http.put(API_ENDPOINT.url + '/refridgerationUnit', units).then(function(result) {
             //console.log(units);
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
          //  if (resp.data.success) {

          if (respS.status!==200) {
              console.log("Suppliers Error");
              console.log(respS.status.msg);
          }
          if (respS.status==200) {
              //console.log("Suppliers Success "+respS.data);
              //save to localStorage
            /*  window.localStorage.setItem( 'Supplier1', resp.data.Supplier1 );
              window.localStorage.setItem( 'Supplier2', resp.data.Supplier2 );
              window.localStorage.setItem( 'Supplier3', resp.data.Supplier3 );
              window.localStorage.setItem( 'Supplier4', resp.data.Supplier4 );
              window.localStorage.setItem( 'Supplier5', resp.data.Supplier5 );
              window.localStorage.setItem( 'Supplier6', resp.data.Supplier6 );
              window.localStorage.setItem( 'Supplier7', resp.data.Supplier7 );
              window.localStorage.setItem( 'Supplier8', resp.data.Supplier8 );
              window.localStorage.setItem( 'Supplier9', resp.data.Supplier9 );
              window.localStorage.setItem( 'Supplier10', resp.data.Supplier10 );*/

              window.localStorage.setItem( 'SupplierData', JSON.stringify(respS.data));

            }//end if

          });
        });
      };

    var putSuppliers = function(suppliers) {
      //console.log("services.putSuppliers");
      //console.log(suppliers);
          return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/suppliers', suppliers).then(function(result) {
            //console.log(suppliers);
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

    var getFood = function() {
        return $q(function(resolve, reject) {
          $http.get(API_ENDPOINT.url + '/food').then(function(resp) {
            /*console.log(resp.data);
            console.log(resp.data.msg);
            console.log(resp.status);
            console.log(resp.status.msg);*/

            if (resp.status!==200) {
                console.log("Food Error");
                console.log(resp.status.msg);
            }
            if (resp.status==200) {
              //console.log("Food Success");
              //save to localStorage
              /*window.localStorage.setItem( 'Food1', resp.data.Food1 );
              window.localStorage.setItem( 'Food2', resp.data.Food2 );
              window.localStorage.setItem( 'Food3', resp.data.Food3 );
              window.localStorage.setItem( 'Food4', resp.data.Food4 );
              window.localStorage.setItem( 'Food5', resp.data.Food5 );
              window.localStorage.setItem( 'Food6', resp.data.Food6 );
              window.localStorage.setItem( 'Food7', resp.data.Food7 );
              window.localStorage.setItem( 'Food8', resp.data.Food8 );
              window.localStorage.setItem( 'Food9', resp.data.Food9 );
              window.localStorage.setItem( 'Food10', resp.data.Food10 );*/

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
            //console.log(food);
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
              console.log(formData);

                if (result.data.success) {
                  console.log(result.data.msg);

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
              //

              resolve(result.data.msg);
            } else {
              reject(result.data.msg);
            }
          });
        });
    };

    var postPhoto = function(deliveryForm,imageData) {
      return $q(function(resolve, reject) {

        let formData = new FormData();

        if(imageData != undefined){
          //formData.append('filename',imageData);
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

          $http({
             url: API_ENDPOINT.url+"/foodDelivery",
             method: "POST",
             data: formData,
             headers: {"Content-Type": undefined}
          }).then((result) => {
             //console.log("success");
             resolve(result.data.msg);
          }).catch(() => {
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
        //console.log("Not authenticated");
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
  })//;
  //end LocationService

  .service('DataService', function($q,$cordovaNetwork,$rootScope) {
      var connectionStatus = function() {
            return $q(function(resolve, reject) {

              var isOffline = $cordovaNetwork.isOffline();

              if(isOffline){
                resolve("offline");
              }

              var isOnline = $cordovaNetwork.isOnline();

              if(isOnline){
                resolve("online");
              }

          });
        };

      return {
        connectionStatus: connectionStatus,
      };
    })//;
    //end dataService

    .service('StorageService', function($q) {
        var storeTransportForm = function(transportForm) {
              //return $q(function(resolve, reject) {

                //load array
              /*  var transportArray = window.localStorage.getItem('transportArray');
                if(transportArray == undefined)
                {
                  //window.localStorage.setItem( 'transportArray', JSON.stringify(transportForm));
                }
                transportArray = ('transportArray: ', JSON.parse(transportArray));*/

                var transportForms = [];
                transportForms[0] = prompt("test1");
                transportForms[1] = prompt("test2");

                console.log(transportForms);

                localStorage.setItem("transportForms", JSON.stringify(transportForms));

                var storedForms = JSON.parse(localStorage.getItem("transportForms"));

                console.log(storedForms);




                //add Form

                //save array

            //});
          };

        return {
          storeTransportForm: storeTransportForm,
        };
      });
      //end StorageService
