# HACCPAPZ Mobile App
###### Martin Coleman, G00312351

## Introduction
This repository contains all the source code of the Haccpapz mobile application. 

This repository is part of my final year project for my B.Sc. in Software Development.
This repository contains the mobile application developed using Ionic.

The other half of the project can be found at: https://github.com/Martinc94/HACCPAPZ-Server.

It contains the server that serves this Mobile application and the server that serves a Web application.

## Technologies
### Ionic
Ionic is the open-source mobile app development framework that makes it easy to build top quality native and progressive web apps with web technologies.[1]

Ionic is based on Angular and comes with many significant performance, usability, and feature improvements over the past versions.[1]

Ionic is fully cross platform and is capable of using over 120 native device features such as bluetooth.[2]

I chose ionic as it was a requirement for the Mobile application to be available on andriod and iOS. Ionic also allowed me to use the devices native camera to take photos for the application which was also a requirement.

### Local Storage
To store data locally on devices i used ngStorage.

Example of how to store and retrieve data from local storage:
```
window.localStorage.setItem( ‘key’, ‘value’ );

window.localStorage.getItem( ‘key’ );
```

### HTTP Services
To communicate to the API server the mobile application uses services in the form of HTTP methods.

Example of HTTP Method used:
```
var login = function (user) {
      return $q(function (resolve, reject) {
        $http.post(API_ENDPOINT.url + '/authenticate', user).then(function (result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
};
```
### Cordova Camera Plugin
Cordova's camera plugin provides an API for taking pictures and for choosing images from the system's image library.[4]


Example of how to take and return a picture to application:
```
$scope.takePicture = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        cameraDirection: 1,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.toggle = true;
      }, function (err) {
        // An error occured. Show a message to the user
      });
}
```
 

## Requirements
Nodejs 6.10.0 or greater

Npm 3.10.5 or greater

Download node from here:
https://nodejs.org/en/

## How to run
Download source code and install frameworks(Node, Npm).

Open CMD and navigate to HACCP folder.

Run the following commands to setup required modules:
```
npm install -g ionic
npm install 
npm install -g cordova 
npm install -g bower
```
Run the following commands to download required Platform:
```
ionic platform add android
ionic platform add ios
```

Run the following commands to test application:
```
ionic serve
```

Run the following commands to build packages for each device:
```
ionic build android
ionic build ios
```

## References
1. https://github.com/driftyco/ionic
2. http://ionicframework.com/
3. https://medium.com/@petehouston/awesome-local-storage-for-ionic-with-ngstorage-c11c0284d658
4. https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/
