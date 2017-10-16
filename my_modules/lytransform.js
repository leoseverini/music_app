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
        if(rdurations[i] == 0.5) rdurations[i] = "b";
        if(rdurations[i] == 0.25) rdurations[i] = "l";
    }

    let ret = {
        notes: rnotes,
        durations: rdurations,
        octaves: roctaves,
        str: this.getString(rnotes, roctaves, rdurations)
    };

    return ret;
};

module.exports.lyTransform = lyTransform;