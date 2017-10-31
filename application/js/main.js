const remote = require('electron').remote;

(function () {
    var mainApp = angular.module('mainModule', []);

    mainApp.controller("appCtrl", ['$scope', function ($scope) {
        $scope.mainProperties = {};

        $scope.mainProperties.showDialog = false;

        $scope.mainProperties.dialog = {
            title: "Title",
            content: "Contenido",
            closeButton: function () {
                $scope.mainProperties.showDialog = false;
            }
        };

        $scope.menuItems = [
            {link: "selectProject.html"},
            {link: "listProjects.html"},
            {link: "materials.html"}
        ];

        $scope.menuItemSelected = function (item) {
            $scope.appUrlContent = "application/html/" + $scope.menuItems[item].link;
        };

        $scope.closeApp = function () {
            var window = remote.getCurrentWindow();
            window.close();
        };

        $scope.menuItemSelected(0);
    }]);
})();
