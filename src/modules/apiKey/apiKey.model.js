module.exports = {
    model: undefined,
    init: function () {
        const database = require('../../../db').mongo;
        const Schema = database.Schema;

        const ApiKeySchema = new Schema({
            key: { type: String },
            updated_at: { type: Number },
        });

        // ApiKey Model 
        const ApiKey = database.model('ApiKey', ApiKeySchema);
        this.model = ApiKey;
        return ApiKey;
    }
}
