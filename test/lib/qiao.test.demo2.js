var fs             = require('fs');
var archiver     = require('archiver');
 
/**
* zip folder
* destZip, d:/1.zip
* sourceFolder, d:/test1 
* cb, callback
*/
exports.zipFolder = function(destZip, sourceFolder, cb){
    // init
    var output = fs.createWriteStream(destZip);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });
     
    // on
    output.on('close', function() {
        cb(null, '压缩完成！');
    });
    archive.on('error', function(err) {
        cb(err);
    });
 
    // zip
    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
};
