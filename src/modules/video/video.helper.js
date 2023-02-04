const videoModel = require("./video.model").model;

class videoHelper {
    /**
     * getLogObject Get log object
     * @param  {String} vehicleNumbe
     * @return {Object} log object
     */
    async getVideos() {
        return await videoModel.findOne({}).exec() || {}
    }
}

module.exports = new videoHelper()