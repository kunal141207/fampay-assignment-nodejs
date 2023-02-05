const apiKeyModel = require("./apiKey.model").model;

class apiKeyHelper {
    apiKey = undefined

    /**
     * addapiKeys add api key
     * @param  {String} key
     * @return {Object} apiKey
     */
    async addApiKey(apiKey) {
        try {
            const apiKeyObj = await apiKeyModel.findOneAndUpdate({
                key: apiKey
            },
                {
                    key: apiKey,
                    updated_at: Date.now()
                },
                {
                    upsert: true,
                    new: true
                }
            ).exec()
            this.apiKey = apiKey
            return apiKeyObj
        }
        catch (err) {
            console.log('err in addApiKey', err)
            throw err
        }
    }

    async init() {
        try {
            const apiKeyLatest = await apiKeyModel.find().sort({ updated_at: -1 }).limit(1).exec()
            this.apiKey = apiKeyLatest[0]["key"]
        }
        catch (err) {
            console.log("couldn't find a valid api key please add 1 to fetch")
        }
    }
}

module.exports = new apiKeyHelper()