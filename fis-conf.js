// fis.match('*', {
//     deploy: fis.plugin('local-deliver', {
//         to: '/work/www/ewm4.18'
//     })
// })


// fis.match('*.js', {
//     // fis-optimizer-uglify-js 插件进行压缩，已内置
//     optimizer: fis.plugin('uglify-js')
// });

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css'),
    // fis-postprocessor-autoprefixer插件进行兼容性

});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});


fis.match('::package', {
    postpackager: fis.plugin('loader', {})
})

fis.match('**/*.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {}),
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['last 5 versions']
    })
});

// fis.match('/widget/**', {
//     useSameNameRequire: true,
//     release: '/static/$0'
// });


//启用插件
fis.hook('relative');
//让所有文件， 都使用相对路径。
fis.match('**', {
    relative: true
})

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
})

/*fis.match('/widget/**.{less,css}', {
    packTo: '/static/widget/widget.css',
});

fis.match('/widget/**.js', {
    packTo: '/static/widget/widget.js'
});*/

/********************  配置资源路径 START ********************/
// 所有的 js
// fis.config.merge({
//     roadmap: {
//         path: [
//             {
//                 reg: '/widget/(*.{png,gif.jpg})',
//                 release: '/static/img/$&'
//             }

//         ]

//     }
// });

/********************  配置资源路径 END  ********************/



/********************  定位资源 START ********************/
// fis.match('*.{js,css,png,gif,jpg}', {
//     useHash: true // 开启 md5 戳
// });
// // 所有的 js
// fis.match('**.js', {
//     //发布到/static/js/xxx目录下
//     release: '/static/js$0'
// });

// // 所有image目录下的.png，.gif文件
// fis.match('/widget/(*.{png,gif.jpg})', {
//     //发布到/static/pic/xxx目录下
//     release: '/static/img/$1$2'
// });

// // 所有的 css
// fis.match('**.css', {
//     //发布到/static/css/xxx目录下
//     release: '/static/css$0'
// });
/********************  定位资源 END  ********************/
