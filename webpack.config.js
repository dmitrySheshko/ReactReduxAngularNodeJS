const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        site: './client/app/index.js',
        admin: './client/admin/app/app.js'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    watch: NODE_ENV === 'development',

    devtools: NODE_ENV === 'development' ? 'eval-source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            include: [
                path.join(__dirname, 'client')
            ],
            loaders: [ 'react-hot', 'babel?presets[]=stage-0' ]
        }]
    },
    resolve: {
        extentions: [ '', '.js' ]
    }
    /*devtools: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/app/index.js')
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')
                ],
                loaders: [ 'react-hot', 'babel?presets[]=stage-0' ]
            }
        ]
    },
    resolve: {
        extentions: [ '', '.js' ]
    }*/
};

if(NODE_ENV === 'production'){
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }));
}