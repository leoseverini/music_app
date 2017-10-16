var fs = require('fs-extra');

var lsProjects = function () {
};

lsProjects.prototype.createProject = function (callback) {
    var max = 0;
    fs.readdir("projects", (err, files) => {
        files.forEach(file => {
            var val = parseInt(file);
            if (val > max)
                max = val;
        });

        var projectName = "" + (max + 1);
        console.log("New projectName :" + projectName);
        fs.mkdirSync("projects/" + projectName);
        fs.mkdirSync("projects/" + projectName + "/data");

        fs.copySync('./defaults/project.json', "projects/" + projectName + '/project.json');
        fs.copySync('./defaults/input.notes', "projects/" + projectName + '/input.notes');
        fs.copySync('./defaults/base.preview.svg', "projects/" + projectName + '/data/base.preview.svg');

        if(callback)
            callback();
    })
};

module.exports.lsProjects = lsProjects;