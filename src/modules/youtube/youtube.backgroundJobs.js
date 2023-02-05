const cron = require('node-cron');
const { config } = require('./../../../config');
const youtubeHelper = require('./youtube.helper.js');

const startYtmining = () => {
    console.log("adding cron job to start yt mining")
    cron.schedule(config.cron_jobs.VIDEO_MINING_INTERVAL, () => {
        youtubeHelper.startMining();
    });
}


module.exports = {
    startYtmining
}
