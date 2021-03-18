import mongoose, { Schema } from 'mongoose'
import initConnection from '@/api/.'

const github_repoSchema = new Schema({
    name: String,
    bytes: Number,
    languages: [{
        name: String,
        bytes: { type: Number, default: 0 }
    }]
});
export default mongoose.model('github_repos') || mongoose.model('github_repos', github_repoSchema);