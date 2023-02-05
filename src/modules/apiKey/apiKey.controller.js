const apiKeyHelper = require('./apiKey.helper');

/**
 * videoHandler
 */
class videoHandler {
    /**
     * addApiKey add API Key
     * @path {POST} /api/apikey
     * @param  {Object}   req request object
     * @param  {Object}   res response object
     * @param  {Function} next middleware
     * @name addApiKey
     * @code {201} if the request is successful
     * @code {500} if the request fails because of a server error
     */
    async addApiKey(req, res, next) {
        const out = {
            statusCode: 500,
            data: {},
        };
        try {
            const { key } = require('url').parse(req.url, true).query;
            if (!key) {
                out.statusCode = 400;
                out.data = { message: "missing key in param" };
                res.status(out.statusCode).json(out);
                return
            }
            const apiKey = await apiKeyHelper.addApiKey(key);
            out.statusCode = 201;
            out.data = apiKey;
            res.status(out.statusCode).json(out);
        } catch (err) {
            console.log('error in addApiKey', err);
            error.statusCode = err.statusCode || 500;
            error.message = err.message || "DatabaseError";
            res.status(error.statusCode).json(error);
        }
    }
    /**
     * init
     * @param  {Object} app
     */
    init(app) {
        app.post('/api/apikey', this.addApiKey);
    }
}

module.exports = new videoHandler();
