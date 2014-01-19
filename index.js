var _ = require('lodash');

exports.register = function (plugin, options, callback) {

    var environment = process.env.NODE_ENV || 'development';

    // Hook onto the 'onPostHandler'
    plugin.ext('onPostHandler', function (request, next) {
        // Get the response object
        var response = request.response;

        // Check to see if the response is a view
        if (response.variety === 'view') {
                if(_.isEmpty(response.source.context.assets)){
                    response.source.context.assets = {};
                }
                response.source.context.assets = options[environment];
        }
        next();
    });
};