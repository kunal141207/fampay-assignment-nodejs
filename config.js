const config = {
    MONGODB_SERVER: "<MongoUrl>",
    youtube: {
        URL: "https://www.googleapis.com/youtube/v3/search",
        SEARCH_QUERY: "India",
        PART: "snippet",
        TYPE: "video",
        ORDER: "date",
        DEFAULT_PUBLISHED_AFTER: "2023-02-02T12:00:00Z",
        LIMIT: 25
    },
    cron_jobs: {
        VIDEO_MINING_INTERVAL: '*/1 * * * *' // every 1 minutes
    },
}

module.exports = { config }