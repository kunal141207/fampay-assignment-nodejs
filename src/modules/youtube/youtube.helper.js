const { config } = require('../../../config');
const axios = require('axios');
const querystring = require('querystring');
const videoHelper = require('../video/video.helper');

class youtubeHelper {
    latestVideoTime = config.youtube.DEFAULT_PUBLISHED_AFTER
    /**
     * _fetchVideosYt fetch Latest videos from yt
     * @param  {String} latestVideoTime
     * @return {Object} yt object
     */
    async _fetchVideosYt() {
        try {
            const searchParams = {
                part: config.youtube.PART,
                key: config.youtube.KEY,
                q: config.youtube.SEARCH_QUERY,
                type: config.youtube.TYPE,
                order: config.youtube.ORDER,
                publishedAfter: this.latestVideoTime,
                maxResults: config.youtube.LIMIT,
            }

            const url = config.youtube.URL + "?" + querystring.stringify(searchParams)

            console.log(url)

            const resp = await axios.get(url);
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
            const docArr = []
            ytVideos["items"].forEach((video) => {
                if(video["snippet"]["publishedAt"]>this.latestVideoTime){
                    this.latestVideoTime = video["snippet"]["publishedAt"]
                }
                docArr.push({  
                    title:  video["snippet"]["title"],
                    description:  video["snippet"]["description"],
                    published_at:  video["snippet"]["publishedAt"],
                    thumbnails:  video["snippet"]["thumbnails"]["default"]                   
                })       
            });
            console.log(docArr)
            await videoHelper.populateVideos(docArr)
            
        }
        catch (err) {
            console.log('error in startMining', err)
        }
    }

    async init() {
        this.latestVideoTime = await videoHelper.getLatestpublishedAt()
    }



}

module.exports = new youtubeHelper()