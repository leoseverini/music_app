(function () {
    angular.module('mainModule').controller("keyboardCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
        const fs = require("fs");
        var ac = new AudioContext();

        $scope.finalisList = [
            ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
        ];

        $scope.noteModes = ["sharp", "flat"];
        $scope.noteModeSelected = 0;
        $scope.selectNoteMode = function (index) {
            $scope.noteModeSelected = index;
        };

        $scope.tempoButtons = [1, 2, 4, 8, 16, 32];
        $scope.tempoSelected = 2;
        $scope.selectTempo = function (index) {
            $scope.tempoSelected = index;
        };
        $scope.removePressed = false;
        $scope.removePress = function (pressed) {
            console.log("removePress");
            $scope.removePressed = pressed;
            // On Mouse UP
            if (!pressed) {
                $scope.mainProperties.inputNotes.pop();
                creatNoteFiles();
            }
        };

        $scope.deletePressed = false;
        $scope.deletePress = function (pressed) {
            $scope.deletePressed = pressed;
            if (!pressed) {
                $scope.mainProperties.inputNotes = [];
                creatNoteFiles();
            }
        };

        $scope.a = {};
        $scope.a.imagePreviewSrc = "";
        // $scope.dir = $scope.mainProperties.selectedProject.dir;
        // $scope.filePath = "projects/" + $scope.dir;

        $scope.refreshImage = function () {
            $timeout(function () {
                var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                $scope.a.imagePreviewSrc = "projects/" + $scope.mainProperties.selectedProject.dir + "/data/base.preview.svg?cb=" + random;
            }, 0);
        };

        $scope.refreshImage();

        $scope.noteList = "";
        $scope.keyPressed = function (evt) {
            var note = "";
            var noteAccidental = "";
            if ($scope.noteModeSelected == 0)
                noteAccidental = evt.note;
            else
                noteAccidental = evt.noteB;

            note = noteAccidental + evt.noteOct;

            Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (inst) {
                var pnote = note.replace("s", "#");
                // pnote.replace("f","B");
                inst.play(pnote, ac.currentTime, {duration: 0.5})
            });

            $scope.mainProperties.inputNotes.push($scope.tempoButtons[$scope.tempoSelected] + "/" + evt.noteOct + "/" + noteAccidental);
            creatNoteFiles();
        };

        var creatNoteFiles = function () {
            $scope.noteList = $scope.mainProperties.inputNotes.toString();
            fs.writeFile("projects/" + $scope.mainProperties.selectedProject.dir + "/input.notes", $scope.noteList, function (err) {
                if (err) {
                    return console.log(err);
                }

                let lygen = new lyGenerator($scope.mainProperties.selectedProject.dir , function(){
                    lygen.createBase($scope.mainProperties.selectedProject.dir, function () {
                        $scope.refreshImage();
                    });
                });
            });
        }
    }])
})();