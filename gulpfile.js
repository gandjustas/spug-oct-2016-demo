var gulp = require('gulp');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var spsave = require('gulp-spsave');
var exec = require('child_process').exec;

var creds = require("windows-credman").getCredentials("vnextsoft");


gulp.task('build', function() {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src() 
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('spsave', ['build'],  function() {
  return gulp.src("./build/*.js")
             .pipe(spsave({
                    siteUrl: "https://gandjustas.sharepoint.com/sites/dev",
                    folder: "SiteAssets/LeaveForm"
                }, creds));
});

gulp.task('set-sp-properties', ['spsave'], function(cb) {
    exec("powershell ./powershell/SetSpProperties.ps1",{ }, function (err, stdout, stderr) {
        gutil.log(`stdout: ${stdout}`);
        gutil.log(`stderr: ${stderr}`);  
        cb(err); 
    });
});

gulp.task("deploy", ['set-sp-properties']);

gulp.task("copy-js-to-template", ['build'], function() {
    return gulp.src("./build/*.js")
            .pipe(gulp.dest('template'));
});

gulp.task("package", ['copy-js-to-template'], function(cb) {
    exec("powershell ./powershell/CreateTemplate.ps1",{ }, function (err, stdout, stderr) { 
        gutil.log(`stdout: ${stdout}`);
        gutil.log(`stderr: ${stderr}`);  
        cb(err); 
    });    
});
