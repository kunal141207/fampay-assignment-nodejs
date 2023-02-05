
module.exports = {
    init: function (app) {
        const videoModel = require("./modules/video/video.model")
        videoModel.init()
        const videoController = require("./modules/video/video.controller")
        videoController.init(app)
        const { startYtmining } = require("./modules/youtube/youtube.backgroundJobs")
        startYtmining()
    }
}