var lyTransform = function (base) {
    this.base = base;
    this.notes = [];
    this.durations = [];
    this.octaves = [];

    var arrNotes = base.toString().split(',');

    for (note in arrNotes) {
        var noteDuration = arrNotes[note].toString().split('/')[0];
        var noteOctave = arrNotes[note].toString().split('/')[1];
        var noteCode = arrNotes[note].toString().split('/')[2];

        this.notes.push(noteCode);
        this.octaves.push(noteOctave);
        this.durations.push(noteDuration);
    }
}


lyTransform.prototype.getString = function (notes, octaves, durations) {
    var str = [];
    for (var i in notes) {
        str.push(durations[i] + "/" + octaves[i] + "/" + notes[i])
    }

    return str.toString();
}


lyTransform.prototype.getBase = function () {
    var ret = {
        notes: this.notes,
        durations: this.durations,
        octaves: this.octaves,
        str: this.getString(this.notes, this.octaves, this.durations)
    }
    return ret;
}

lyTransform.prototype.getInverse = function () {
    let rnotes = this.notes.reverse();
    let rdurations = this.durations.reverse();
    let roctaves = this.octaves.reverse();

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

module.exports.lyTransform = lyTransform;