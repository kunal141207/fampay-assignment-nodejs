
module.exports = {
    init: function (app) {
        const apiKeyModels = require("./modules/apiKey/apiKey.model")
        apiKeyModels.init()
        const apiKeyController = require("./modules/apiKey/apiKey.controller")
        apiKeyController.init(app)
        const apiKeyHelper = require("./modules/apiKey/apiKey.helper")
        const videoModel = require("./modules/video/video.model")
        videoModel.init()
        const videoController = require("./modules/video/video.controller")
        videoController.init(app)
        const youtubeHelper = require("./modules/youtube/youtube.helper")
        youtubeHelper.init()
        apiKeyHelper.init().then(() => {
            const { startYtmining } = require("./modules/youtube/youtube.backgroundJobs")
            startYtmining()
        })
    }
}