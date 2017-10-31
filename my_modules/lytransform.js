let lyTransform = function (base) {
    this.base = base;
    this.notes = [];
    this.durations = [];
    this.octaves = [];

    let arrNotes = base.toString().split(',');

    for (let note in arrNotes) {
        let noteDuration = arrNotes[note].toString().split('/')[0];
        let noteOctave = arrNotes[note].toString().split('/')[1];
        let noteCode = arrNotes[note].toString().split('/')[2];

        this.notes.push(noteCode);
        this.octaves.push(noteOctave);
        this.durations.push(noteDuration);
    }
};


lyTransform.prototype.getString = function (notes, octaves, durations) {
    let str = [];
    for (let i in notes) {
        str.push(durations[i] + "/" + octaves[i] + "/" + notes[i])
    }

    return str.toString();
};


lyTransform.prototype.getBase = function () {
    let ret = {
        notes: this.notes,
        durations: this.durations,
        octaves: this.octaves,
        str: this.getString(this.notes, this.octaves, this.durations)
    };
    return ret;
};

lyTransform.prototype.getInverse = function () {
    let rnotes = this.notes.slice(0).reverse();
    let rdurations = this.durations.slice(0).reverse();
    let roctaves = this.octaves.slice(0).reverse();

    let ret = {
        notes: rnotes,
        durations: rdurations,
        octaves: roctaves,
        str: this.getString(rnotes, roctaves, rdurations)
    };

    return ret;
};

lyTransform.prototype.getAugmentation = function (augRate) {
    let rnotes = this.notes.slice(0);
    let rdurations = this.durations.slice(0);
    let roctaves = this.octaves.slice(0);
    for (let i = 0; i < rdurations.length; i++) {
        rdurations[i] = rdurations[i] * augRate;
    }

    let ret = {
        notes: rnotes,
        durations: rdurations,
        octaves: roctaves,
        str: this.getString(rnotes, roctaves, rdurations)
    };

    return ret;
};

lyTransform.prototype.getDiminution = function (dimRate) {
    let rnotes = this.notes.slice(0);
    let rdurations = this.durations.slice(0);
    let roctaves = this.octaves.slice(0);
    for (let i = 0; i < rdurations.length; i++) {
        rdurations[i] = parseFloat(rdurations[i]) / parseFloat(dimRate);
        if (rdurations[i] == 0.5) rdurations[i] = "b";
        if (rdurations[i] == 0.25) rdurations[i] = "l";
    }

    let ret = {
        notes: rnotes,
        durations: rdurations,
        octaves: roctaves,
        str: this.getString(rnotes, roctaves, rdurations)
    };

    return ret;
};

lyTransform.prototype.getChromaticTransposition = function (interval) {


    let rnotes = this.notes.slice(0);
    let rdurations = this.durations.slice(0);
    let roctaves = this.octaves.slice(0);

    for (let i = 0; i < rnotes.length; i++) {
        let tnote =  getNoteByIndex(getIndexByNote(rnotes[i]) + interval);
        rnotes[i] = tnote.note;
        roctaves[i] = parseInt(roctaves[i]) + tnote.delta;
    }

    let ret = {
        notes: rnotes,
        durations: rdurations,
        octaves: roctaves,
        str: this.getString(rnotes, roctaves, rdurations)
    };

    return ret;
};

let _NOTES_S = ["C", "CS", "D", "DS", "E", "F", "FS", "G", "GS", "A", "AS", "B"];
let _NOTES_F = ["C", "DF", "D", "EF", "E", "F", "GB", "G", "AF", "A", "BF", "B"];

let getIndexByNote = function (note, isFlat) {
    let _NOTES = (isFlat) ? _NOTES_F : _NOTES_S;
    return _NOTES.indexOf(note) % 12;
};

let getNoteByIndex = function (index, isFlat) {
    let _NOTES = (isFlat) ? _NOTES_F : _NOTES_S;

    return {"note":_NOTES[index % 12], "delta": parseInt(index/12)}
};

module.exports.lyTransform = lyTransform;