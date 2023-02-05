module.exports = {
    model: undefined,
    init: function () {
        const database = require('./../../../db').mongo;
        const Schema = database.Schema;

        const VideoSchema = new Schema({
            title: { type: String },
            url: [Number]
        });

        // Video Model 
        const Video = database.model('Video', VideoSchema);
        this.model = Video;
        return Video;
    }
}
