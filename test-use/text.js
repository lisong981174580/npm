var qiaoTestDemo2 = require('test-lisong');
 
function test(){
    var destZip            = 'd:/1.zip';
    var sourceFolder     = 'd:/test1';
 
    qiaoTestDemo2.zipFolder(destZip, sourceFolder, function(err, msg){
        if(err) throw err;
 
        console.log(msg);
    });
}
 
test();


