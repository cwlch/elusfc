/**
 * Created by 201603310162 on 2016/5/11.
 */
var gulp = require('gulp')
	,webpack = require('webpack')
	,gutil = require('gulp-util')
	,webpackConfig = require('./webpack.config.js')
	,server = require('./httpserver.js')
	,minimist = require("minimist")
	,build = require("./build_config.json")
	,clean = require("gulp-clean")
	,path = require("path")
	,paths = ['./src/*','./src/**/*'] //文件路劲
	,argv = minimist(process.argv)
	,stringSrc = function(filename, string) { //把特定的字符转成流
		var src = require('stream').Readable({
			objectMode: true
		});
		src._read = function() {
			this.push(new gutil.File({
				cwd: '',
				base: '',
				path: filename,
				contents: new Buffer(string)
			}));
			this.push(null);
		};
		return src;
	};


//监听任务
gulp.task('watch', function() {
	gulp.watch(paths,['webpack']);
});
//清除文件任务
gulp.task("clean",function () {
	return gulp.src(build.dest).pipe(clean());
});
//生成后端服务地址
gulp.task('serverPath', function () {
	//取出对应的配置信息
	var envConfig, conConfig = '',serverPath = build.serverPath;
	for(var i = 0; i < serverPath.length; i++){
		if (argv.test) {
			envConfig = serverPath[i].test;
		} else if (argv.repro) {
			envConfig = serverPath[i].repro;
		} else if (argv.pro) {
			envConfig = serverPath[i].pro;
		} else {
			envConfig = serverPath[i].dev;
		}
		conConfig += 'window.serverPath'+ i +' = ' + JSON.stringify(envConfig) +';';
	}


	// conConfig = 'window.serverPath = ' + JSON.stringify(envConfig) +';';

	//base_url.js文件
	return stringSrc('serverPath.js', conConfig)
		.pipe(gulp.dest(path.resolve(__dirname ,build.src + '/js/') ));
});
//生成静态资源库地址
// gulp.task('staticPath',function () {
//
// 	//取出对应的配置信息
// 	var envConfig, conConfig,staticPath = build.staticPath;
//
// 	if (argv.test) {
// 		envConfig = staticPath.test;
// 	} else if (argv.repro) {
// 		envConfig = staticPath.repro;
// 	} else if (argv.pro) {
// 		envConfig = staticPath.pro;
// 	} else {
// 		envConfig = staticPath.dev;
// 	}
//
// 	conConfig = 'window.staticPath = ' + JSON.stringify(envConfig) +';';
//
// 	//base_url.js文件
// 	return stringSrc('staticPath.js', conConfig)
// 		.pipe(gulp.dest(path.resolve(__dirname ,build.src + '/js/common/') ));
// });


//webpack打包任务
gulp.task('webpack', function(cb) {
	webpack(webpackConfig, function(err, stats) {
		console.log(stats.errors, stats.warnings);
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		cb();
	});

});

gulp.task("help",function () {
	console.log("所有打包输出口为:'" + build.dest + "'");
	console.log("gulp --dev  |  开发环境,自动启动本地服务。端口为:" + build.config.port);
	console.log("gulp --test  |  测试环境,请在test分支中运行");
	console.log("gulp --repro  |  准生产环境,请在release分支中运行");
	console.log("gulp --pro  |  生产环境,请在master分支中运行");
});

gulp.task("m-img",function () {
	gulp.src( build.src+'/img/move_img/**' ).pipe( gulp.dest(build.dest +'/img/move_img/') );
});

// 运行任务
gulp.task('default',['serverPath','clean'], function() {
	if(!argv.dev){
		gulp.start(['m-img','webpack'],function () {
			console.log("打包完毕")
		});
	}else{
		gulp.start(['m-img','watch','webpack'],function () {
			console.log("打包完毕")
		});
		server();
	}
});