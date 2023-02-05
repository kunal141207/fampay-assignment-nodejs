module.exports = {
    model: undefined,
    init: function () {
        const database = require('./../../../db').mongo;
        const Schema = database.Schema;

        const VideoSchema = new Schema({
            title: { type: String },
            description: { type: String },
            published_at: { type: String },
            thumbnails: { type: Object }
        });

        // Video Model 
        const Video = database.model('Video', VideoSchema);
        this.model = Video;
        return Video;
    }
}
