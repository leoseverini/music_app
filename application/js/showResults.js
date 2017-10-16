let path = require('path');

(function () {
    let mainApp = angular.module('mainModule');

    mainApp.controller("showResultsCtrl", ['$scope', function ($scope) {
        $scope.images = [];
        let files = [];

        let projectPath = 'projects/0/data';

        fs.readdir(projectPath, (err, dir) => {
            for (let filePath of dir) {
                let extName = path.extname(filePath);

                if (extName === '.svg') {
                    console.log(filePath);
                    files.push(projectPath + "/" + filePath);
                }
            }
        });

        $scope.readFiles = function () {
            $scope.images = files;
        }
    }]);
})();
