(function () {
    angular.module('mainModule').directive('lsKeyboard', function () {
        return {
            scope: {
                value: '=',
                octaves: '@',
                octStart: '@',
                onKeyPressed: '&'
            },
            transclude: false,
            replace: true,
            template: `
    <div class="keyboardDiv">
        <div ng-repeat="keyItem in keyLayout">
            

            <div ng-if="keyItem.type == 0" class="whiteKey"
                 ng-mousedown="onKeyClick($index);"
                 ng-style="{
                 'top': '20px',
                 'left': '{{((keyItem.pos + (7*keyItem.oct))* 22) - 22}}px'
                 }"
                 title="{{keyItem.note}} ({{keyItem.oct + startOctave}})"
            >
            </div>
            <div ng-if="keyItem.type == 1" class="whiteBlack"
                 ng-mousedown="onKeyClick($index);"
                 ng-style="{
                 'top': '20px',
                  'left': '{{((keyItem.pos + (7*keyItem.oct))* 22) - 28}}px'
                 }"
                 title="{{keyItem.note}} ({{keyItem.oct}})"
            >
            </div>
        </div>
        <div class="keyboardWood"></div>
    </div>
            `,

            compile: function (element, attrs) {
                if (!attrs.value) {
                    attrs.value = "";
                }

                if (!attrs.octaves) {
                    attrs.octaves = 4;
                }
                if (!attrs.octStart) {
                    attrs.octStart = "3";
                }

                return this.link;
            },
            link: function (scope, elem, attrs) {

                scope.startOctave = parseInt(attrs.octStart);
                scope.keyLayout = [];
                for (let i = 0; i < attrs.octaves; i++) {
                    var oct = (i + parseInt(scope.octStart));
                    scope.keyLayout.push({"type": 0, "pos": 1, "note": "C", "noteB": "C", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 2, "note": "D", "noteB": "D", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 3, "note": "E", "noteB": "E", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 4, "note": "F", "noteB": "F", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 5, "note": "G", "noteB": "G", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 6, "note": "A", "noteB": "A", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 0, "pos": 7, "note": "B", "noteB": "B", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 1, "pos": 2, "note": "Cs", "noteB": "Df", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 1, "pos": 3, "note": "Ds", "noteB": "Ef", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 1, "pos": 5, "note": "Fs", "noteB": "Gf", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 1, "pos": 6, "note": "Gs", "noteB": "Af", "noteOct": oct, "oct": i});
                    scope.keyLayout.push({"type": 1, "pos": 7, "note": "As", "noteB": "Bf", "noteOct": oct, "oct": i});
                }

                scope.onKeyClick = function (index) {
                    scope.onKeyPressed({insideVal: scope.keyLayout[index]});
                }
            }
        };
    });
})();