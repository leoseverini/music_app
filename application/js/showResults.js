const fs = require("fs");

(function () {
    var mainApp = angular.module('mainModule', []);

    mainApp.controller("showResultsCtrl", ['$scope', function ($scope) {
        $scope.images = []
        var files = [];

        var projectPath ='projects/project1' ;
        
        fs.readdir(projectPath, (err, dir) => {
            
            for(let filePath of dir) {
                console.log(filePath);
                files.push(projectPath + "/"+ filePath);
            }           
        });


        $scope.readFiles = function(){
            $scope.images = files;
        }
    }]);
})();
