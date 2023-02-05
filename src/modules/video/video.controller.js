const videoHelper = require('./video.helper');

/**
 * videoHandler
 */
class videoHandler {
    /**
     * getLatest Get Latest Videos
     * @path {POST} /api/video/latest
     * @param  {Object}   req request object
     * @param  {Object}   res response object
     * @param  {Function} next middleware
     * @name getLatest
     * @code {200} if the request is successful
     * @code {500} if the request fails because of a server error
     * @response {Object}  returns failed and success ids
     */
    async getLatest(req, res, next) {
        const out = {
            statusCode: 500,
            data: {},
        };
        try {
            const {text, limit, skip} = require('url').parse(req.url,true).query;
            const videoData = await videoHelper.getVideos(text, limit, skip);
            out.statusCode = videoData.statusCode || 200;
            out.data = videoData;
            res.status(out.statusCode).json(out);
        } catch (err) {
            console.log('error in getLatest', err);
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
        app.get('/api/video/latest', this.getLatest);
    }
}

module.exports = new videoHandler();
