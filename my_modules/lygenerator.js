const fs = require('fs');
const {lyTransform} = require("./lytransform.js");

const notesToReplace = "%%%replaceNotes%%%";


let lyGenerator = function (projectName, callback) {
    let me = this;
    this.projectName = projectName;
    this.baseTemplate = "";
    this.inputNotes = "";


    fs.readFile('./application/lilypond/ly_template_base.txt', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        me.baseTemplate = data;

        fs.readFile('./projects/' + projectName + '/input.notes', 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            me.inputNotes = data;

            if (callback)
                callback();

            console.log(data);
        });


    });
};


let getLyString = function (notes, octaves, duration) {

    let strNotes = "";
    for (note in notes) {
        if (note != undefined) {
            let noteCode = notes[note];
            let noteOctave = octaves[note];
            let noteDuration = duration[note];
            strNotes += getNoteByIndex(noteCode, noteOctave, noteDuration);
        }
    }

    return "notes = {" + strNotes + "}";
};


lyGenerator.prototype.getInputNotes = function () {
    return this.inputNotes.split(",");
};

lyGenerator.prototype.createTransformations = function (projectName) {
    let outFileProject = './projects/' + projectName;
    let outFileBase = outFileProject + '/data/project_transformations.json';

    let transform = new lyTransform(this.inputNotes);

    let trans = {
        "original": transform.getBase().str,
        "inverse": transform.getInverse().str,
        "augmented": {
            "augmented_2": transform.getAugmentation(2).str,
            "augmented_4": transform.getAugmentation(4).str,
            "augmented_8": transform.getAugmentation(8).str,
            "augmented_16": transform.getAugmentation(16).str
        }
    };

    let transS = JSON.stringify(trans);


    saveToFile(outFileBase, transS, function () {
        console.log("Transformation file created : " + projectName);
    });

};

lyGenerator.prototype.createBase = function (projectName, callback) {
    // this.loadNotes();
    let template = this.baseTemplate;
    let notes = this.inputNotes;

    let base = new lyTransform(notes.toString());
    let outFileProject = './projects/' + projectName + '/';

    // Create BASE
    let arrNotes = base.getBase();
    let strNotes = getLyString(arrNotes.notes, arrNotes.octaves, arrNotes.durations);
    let newTemplate = template.replace(notesToReplace, strNotes);
    console.log(newTemplate);

    let outFileBase = outFileProject + '/data/base.ly';
    saveToFile(outFileBase, newTemplate, function () {
        executeLyTemplate(projectName, outFileBase, function () {
            if (callback) callback();
        }, "base");
    });

    // Create Inversion
    //arrNotes = base.getInverse(); 
    //strNotes = getLyString(arrNotes.notes, arrNotes.octaves, arrNotes.durations);
    //newTemplate = template.replace(notesToReplace, strNotes);

    //outFileBase = outFileProject + '/invert.ly'
    //saveToFile(outFileBase, newTemplate, function(){
    //    executeLyTemplate(projectName, outFileBase, callAtEnd, "invert");
    //});
}


var saveToFile = function (outFileName, data, callAtEnd) {
    fs.writeFile(outFileName, data, function (err) {
        if (err) {
            return console.log(err);
        }

        if (callAtEnd)
            callAtEnd();

        console.log("The file " + outFileName + " was saved!");

    });
}

var exec = require('child_process').exec;

var executeLyTemplate = function (projectName, file, callAtEnd, outputName) {
    var options = {cwd: "projects/" + projectName + "/data"};

    exec('"%ProgramFiles(x86)%/LilyPond/usr/bin/lilypond.exe" -dpreview -dno-print-pages -dbackend=svg ' + outputName + '.ly', options,
        function callback(error, stdout, stderr) {
            console.log("Script " + file + " was created");
            if (callAtEnd)
                callAtEnd();
        });
}


var getNoteByIndex = function (noteName, noteOctave, noteDuration) {
    if (!noteName)
        return "";

    var octaves = [",,,", ",,", ",", "", "'", "''", "'''", "''''"];


    var octv = "";
    var nt = "";

    nt = noteName.toLowerCase();
    octv = octaves[noteOctave];
    // nt = nt.replace("#", "s");
    // nt = nt.replace("b", "f");
    var nd = noteDuration.trim();
    return nt + "" + octv + nd + " ";
};

module.exports.lyGenerator = lyGenerator;