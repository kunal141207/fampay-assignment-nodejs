const { config } = require('../../../config');
const axios = require('axios');
const querystring = require('querystring')

class youtubeHelper {
    /**
     * _fetchVideosYt fetch Latest videos from yt
     * @param  {String} latestVideoTime
     * @return {Object} yt object
     */
    async _fetchVideosYt(latestVideoTime) {
        try {
            const searchParams = {
                part: config.youtube.PART,
                key: config.youtube.KEY,
                q: config.youtube.SEARCH_QUERY,
                type: config.youtube.TYPE,
                order: config.youtube.ORDER,
                publishedAfter: latestVideoTime || config.youtube.DEFAULT_PUBLISHED_AFTER,
                maxResults: config.youtube.LIMIT,
            }

            const url = config.youtube.URL + "?" + querystring.stringify(searchParams)

            console.log(url)

            const resp = await axios.get(url);
            console.log(resp.data);
            return resp.data
        }
        catch (err) {
            console.log('error in _fetchVideosYt',err)
            throw err
        }
    }


    /**
     * startMining of the yt data 
     */
    async startMining() {
        try {
            console.log('start mining yt videos')
            if(!config.youtube.KEY){
                throw new Error("unable to find an api KEY please add one to fetch DATA")
            }
            const ytVideos = await this._fetchVideosYt()
            console.log(ytVideos)
            ytVideos["items"].forEach((video) => {
                console.log(video["snippet"]["title"])
            });
            
        }
        catch (err) {
            console.log('error in startMining', err)
        }
    }




}

module.exports = new youtubeHelper()