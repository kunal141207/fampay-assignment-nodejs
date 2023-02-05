const videoModel = require("./video.model").model;

class videoHelper {
    /**
     * getLogObject Get log object
     * @param  {String} vehicleNumbe
     * @return {Object} log object
     */
    async getVideos(videoTitle = "", limit = 10, skip = 0) {
        try{
            const sSearch = videoTitle.replace(" ", ")(?=.*");
            const regex = new RegExp(`^(?=.*` + sSearch + ").*$");
            return await videoModel.find({
                $or: [
                    { 'data.title': regex },
                    { 'data.decription': regex },
                ]
            }).sort({ "published_at": -1 }).skip(skip).limit(limit).exec() || []
        }
        catch(err){
            console.log('err in getVideos', err)
            throw err
        }
    }

    /**
     * getLogObject Get log object
     * @param  {Array} docArr
     * @return {Object} 
     */
    async populateVideos(docArr) {
        try {
            console.log("populating videos to db")
            if (docArr.length > 0) {
                return await videoModel.insertMany(docArr)
            }
        }
        catch (err) {
            console.log("err in populateVideos", err)
        }
    }

    /**
     * getLatestpublishedAt
     * @return {String} 
     */
    async getLatestpublishedAt() {
        try {
            const latestVideo = await videoModel.find().sort({ "published_at": -1 }).limit(1).exec()
            return latestVideo[0]["published_at"]
        }
        catch (err) {
            console.log("err in getLatestpublishedAt", err)
        }
    }
}

module.exports = new videoHelper()