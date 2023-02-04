module.exports = {
    model: undefined,
    init: function () {
        var database = require('./../../../db').mongo;
        var Schema = database.Schema;

        var VideoSchema = new Schema({
            title: { type: String },
            url: [Number]
        });

        // Model 
        var Video = database.model('Video', VideoSchema);
        this.model = Video;
        return Video;
    }

}
