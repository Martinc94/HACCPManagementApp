angular.module('starter.services', [])

    //LOGIN Service
    .service('LoginService', function ($q) {
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
    })

.factory('Foods', function() {
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
});
