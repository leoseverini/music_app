const fs = require("fs");
const {lyGenerator} = require("./my_modules/lygenerator.js");
const {lsProjects} = require("./my_modules/lsProjects.js");

(function () {
    angular.module('mainModule').controller("selectProjectCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.projects = []
        $scope.selectedProject = {};
        var files = [];

        var projectPath = 'projects';

        var loadProjectsFolder = function (selectLastProject) {
            fs.readdir(projectPath, (err, dir) => {
                var files = [];
                for (let filePath of dir) {
                    console.log(filePath);
                    var projectJsonPath = "projects/" + filePath + "/project.json";

                    var obj = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
                    obj.dir = filePath;
                    files.push(obj);
                }

                $timeout(function () {
                    $scope.projects = files;
                }, 0);

                $timeout(function () {
                    if (selectLastProject)
                        $scope.selectProject(files.length - 1);
                    else
                        $scope.selectProject(0);

                }, 500);

            });
        };

        loadProjectsFolder(false);

        let lygen;
        $scope.selectProjectIndex = 0;
        $scope.selectProject = function ($index) {
            $scope.selectProjectIndex = $index;
            $scope.selectedProject = $scope.projects[$index];
            $scope.a.refreshImagePreview();
            $scope.mainProperties.selectedProject = $scope.selectedProject;

            lygen = new lyGenerator($scope.selectedProject.dir, function () {
                $scope.mainProperties.selectedProject = $scope.selectedProject;
                $scope.mainProperties.inputNotes = lygen.getInputNotes();
            });
        };

        $scope.a = {};
        $scope.a.imagePreviewSrc = "";

        $scope.a.refreshImagePreview = function () {
            $timeout(function () {
                var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                $scope.a.imagePreviewSrc = "projects/" + $scope.selectedProject.dir + "/data/base.preview.svg?cb=" + random;
            }, 0);
        };

        $scope.a.createPreview = function () {
            var projectDir = $scope.selectedProject.dir;
            lygen.loadNotes();
            lygen.createBase(projectDir, function () {
                // $scope.a.refreshImagePreview();
            });
        };

        $scope.a.startAnalysis = function () {
            var projectName = $scope.selectedProject.dir;
            lygen.createTransformations(projectName);
        };

        $scope.a.openPorjectEditor = function () {
            $scope.mainProperties.dialog = {
                title: "Edit Cantus Firmus",
                content: "application/html/keyboard.html",
                closeButton: function () {
                    $scope.a.refreshImagePreview();
                    $scope.mainProperties.showDialog = false;
                }
            };
            $scope.mainProperties.showDialog = true;

        };

        $scope.a.showTransformPreview = function () {
            $scope.mainProperties.showDialog = true;
        };

        $scope.CreateNewProject = function () {
            var pro = new lsProjects();
            pro.createProject(function () {
                loadProjectsFolder(true);
            });
        }
    }]);
})();
