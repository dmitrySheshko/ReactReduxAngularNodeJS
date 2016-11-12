import mongoose from '../../modules/mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);
let Schema = mongoose.Schema;

let schema = new Schema({
    id: {
        type: Number,
        default: 1,
        unique: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    },
    description: {
        type: String
    },
    gender: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(autoIncrement.plugin, { model: 'User', field: 'id' });

export default mongoose.model('User', schema);