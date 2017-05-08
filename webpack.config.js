var webpack = require("webpack")
	,HtmlwebpackPlugin = require('html-webpack-plugin')
	,ExtractTextPlugin = require("extract-text-webpack-plugin")
	,path = require("path")
	,minimist = require("minimist")
	,build = require("./build_config.json")
	,ALIAS = {},COMMON = [],ENTRY = {},PLUGINS = []
	,PATH_SRC = path.resolve(__dirname ,build.src)
	,util
	,argv = minimist(process.argv);
//公共文件打包 提取
//第三方库
if(build.libs){
	for(var i in build.libs){
		ALIAS[i] =  path.resolve(PATH_SRC , build.libs[i])
	}
}

if(build.common){
	build.common.forEach(function(i){
		if(i.indexOf(".js") >= 0 ){
			COMMON.push(path.resolve(PATH_SRC , i));
		}else{
			COMMON.push(i);
		}
	});
}
ENTRY.common = COMMON;
PLUGINS.push(new webpack.optimize.CommonsChunkPlugin('common', './js/common.js'));


//内部UI组件
if(build.ui){
	build.ui.forEach(function(i){
		ALIAS[i.name] =  path.resolve(PATH_SRC , i.src);
	});
}

//设置入口文件JS
for(var x in build.entry){
	ENTRY[x] = path.resolve(PATH_SRC , build.entry[x]);
}




// 加入,提取入口HTML页面插件
for(var page = build.htmlwebpack, i = page.length; i--;){
	var me = page[i];
	me.template = path.resolve(PATH_SRC, me.filename);
	if(me.common)me.chunks.unshift("common");
	PLUGINS.push(new HtmlwebpackPlugin(me));
}

//css提取插件
PLUGINS.push(new ExtractTextPlugin("./css/[name].css",{ allChunks : true,resolve : ['modules'] }));

PLUGINS.push(new webpack.ProvidePlugin(build.providePlugin));



util = {
	entry: ENTRY,
	output: {//静态文件路径设置
		path: build.dest,
		publicPath: '/./' + build.dest + "/",
		chunkFilename : 'js/[name].js?'+build.version,
		filename: 'js/[name].js?'+build.version
	},
	module: {//模版解析
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			}, {
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.js?$/,
				loader:  'babel' ,
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					cacheDirectory: true,
					plugins: ['transform-runtime'],
					compact: false
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=1024&name=img/[name].[ext]'
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},{
				test: /\.css$/,
				loader:ExtractTextPlugin.extract("style", "css")
			}, { //编译SCSS生成link链接
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
			}
		]
	},
	resolve : {//第三方库
		root: PATH_SRC //绝对路径
		,extensions: ['', '.js','.jsx', '.json',".css"]
		,modulesDirectories: [
			'node_modules'
		]
		,alias: ALIAS
	},
	plugins :PLUGINS
	// ,devtool : '#source-map'
};
if(argv.dev){
	util.devtool = '#source-map';
	// util.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}else{
	//压缩js
	util.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}



module.exports = util;