let path = require('path');

(function () {
    let mainApp = angular.module('mainModule');

    mainApp.controller("showResultsCtrl", ['$scope', function ($scope) {
        $scope.images = [];
        let files = [];

        let projectPath = 'projects/0/data';

        let fs = require('fs');
        let tranObj = JSON.parse(fs.readFileSync(projectPath + '/project_transformations.json', 'utf8'));

        for (let i in tranObj) {
            console.log(tranObj[i]);
            let fileName = tranObj[i].name;

            let jitem = {
                "file": projectPath + "/" + fileName + ".preview.svg",
                "name": fileName
            };

            files.push(jitem);
        }

        // fs.readdir(projectPath, (err, dir) => {
        //     for (let filePath of dir) {
        //         let extName = path.extname(filePath);
        //
        //         if (extName === '.svg') {
        //             console.log(filePath);
        //             files.push(projectPath + "/" + filePath);
        //         }
        //     }
        // });

        $scope.readFiles = function () {
            $scope.images = files;
        }
    }]);
})();
