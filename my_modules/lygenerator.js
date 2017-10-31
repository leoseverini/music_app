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

lyGenerator.prototype.createTransformations = function (projectName, callback) {
    let outFileProject = './projects/' + projectName;
    let outFileBase = outFileProject + '/data/project_transformations.json';

    let transform = new lyTransform(this.inputNotes);

    let trans = [
        {"name": "original", "notes": transform.getBase().str},

        {"name": "transposition_1", "notes": transform.getChromaticTransposition(1).str},
        {"name": "transposition_2", "notes": transform.getChromaticTransposition(2).str},

        {"name": "inverse", "notes": transform.getInverse().str},

        {"name": "augmentation_2", "notes": transform.getAugmentation(2).str},
        {"name": "augmentation_4", "notes": transform.getAugmentation(4).str},
        {"name": "augmentation_8", "notes": transform.getAugmentation(8).str},
        {"name": "augmentation_16", "notes": transform.getAugmentation(16).str},
        {"name": "diminution_2", "notes": transform.getDiminution(2).str},
        {"name": "diminution_4", "notes": transform.getDiminution(4).str}

    ];

    let transS = JSON.stringify(trans);

    saveToFile(outFileBase, transS, function () {
        console.log("Transformation file created : " + projectName);
        if (callback)
            callback();
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
};

lyGenerator.prototype.createTranformationsFiles = function (projectName, callback) {
    let template = this.baseTemplate;
    let outFileProject = './projects/' + projectName + '/';

    let jsonFile = JSON.parse(fs.readFileSync(outFileProject + '/data/project_transformations.json', 'utf8'));

    let count = 0;

    for (let obj in jsonFile) {
        let notes = jsonFile[obj].notes;
        let name = jsonFile[obj].name;
        let item = new lyTransform(notes.toString());
        console.log("" + name + " : " + item.base);

        // Create LY File
        let strNotes = getLyString(item.notes, item.octaves, item.durations);
        let newTemplate = template.replace(notesToReplace, strNotes);
        console.log(newTemplate);

        let outFileBase = outFileProject + '/data/' + name + '.ly';
        saveToFile(outFileBase, newTemplate, function () {
            executeLyTemplate(projectName, outFileBase, function () {
                // Execute on the last callback
                count++;
                if (count == jsonFile.length)
                    if (callback) callback();
            }, name);
        });
    }
    // if (callback) callback();
};

let saveToFile = function (outFileName, data, callAtEnd) {
    fs.writeFile(outFileName, data, function (err) {
        if (err) {
            return console.log(err);
        }

        if (callAtEnd)
            callAtEnd();

        console.log("The file " + outFileName + " was saved!");

    });
}

let exec = require('child_process').exec;

let executeLyTemplate = function (projectName, file, callAtEnd, outputName) {
    let options = {cwd: "projects/" + projectName + "/data"};

    exec('"%ProgramFiles(x86)%/LilyPond/usr/bin/lilypond.exe" -dpreview -dno-print-pages -dbackend=svg ' + outputName + '.ly', options,
        function callback(error, stdout, stderr) {
            console.log("Script " + file + " was created");
            if (callAtEnd)
                callAtEnd();
        });
}


let getNoteByIndex = function (noteName, noteOctave, noteDuration) {
    if (!noteName)
        return "";

    let octaves = [",,,", ",,", ",", "", "'", "''", "'''", "''''"];


    let octv = "";
    let nt = "";

    nt = noteName.toLowerCase();
    octv = octaves[noteOctave];

    let nd = noteDuration.trim();
    nd = nd.replace("b", "\\breve");
    nd = nd.replace("l", "\\longa");

    return nt + "" + octv + nd + " ";
};

module.exports.lyGenerator = lyGenerator;