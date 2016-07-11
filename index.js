/**
 * Created by kimown on 4/24/16.
 */

"use strict";

var Hexo;
try {
    Hexo = require('./../hexo/lib/hexo');
}catch (e){
    if(e.code == "MODULE_NOT_FOUND"){

        console.error(`Please install hexo first`);
        console.error(`You can check the guide: https://hexo.io/`);
    } else{
        console.error(e);
        console.error(`You can contact me via github`);
    }
    return;
}

var hexo = new Hexo();
var post = hexo.post;


module.exports = function (markdown) {
    console.time("COST TIME");
    this.cacheable();
    var callback = this.async();

    hexo.init().then(function() {
        return hexo.loadPlugin(require.resolve('hexo-renderer-marked'));
    }).then(()=>{
        post.render(null, {
        content: markdown,
        engine: 'markdown'
    }).then(function(data) {
        console.timeEnd("COST TIME");
        var html = data.more;
        callback(null,html);
    });
})
};
