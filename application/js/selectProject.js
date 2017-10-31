const {ipcRenderer} = require('electron');
;

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
            let projectDir = $scope.selectedProject.dir;
            lygen.loadNotes();
            lygen.createBase(projectDir, function () {
                // $scope.a.refreshImagePreview();
            });
        };

        $scope.a.startAnalysis = function () {

        };

        $scope.a.openProjectEditor = function () {
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
            $scope.mainProperties.showDialog = false;
            $scope.mainProperties.dialog = {
                title: "Preview Transformations",
                content: "application/html/transformationPreview.html",
                closeButton: function () {
                    $scope.mainProperties.showDialog = false;
                }
            };

            let projectName = $scope.selectedProject.dir;
            lygen.createTransformations(projectName, function () {
                lygen.createTranformationsFiles(projectName, function () {
                    $timeout(function () {
                        $scope.mainProperties.showDialog = true;
                    }, 0)

                });
            });

            // console.log('SEND: preview-window-show');
            // ipcRenderer.send('preview-window-show', 'an-argument')
        };

        $scope.CreateNewProject = function () {
            let pro = new lsProjects();
            pro.createProject(function () {
                loadProjectsFolder(true);
            });
        }
    }]);
})();
