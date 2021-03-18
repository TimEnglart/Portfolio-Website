import mongoose, { Model, Schema, Document } from 'mongoose'
import initConnection from '@/api/.'

export interface IGithubLanguages extends Document {
    _id: string;
    bytes: number;
    percent: number;
    projects: number;
}

export interface IGithubLanguagesModel extends Model<IGithubLanguages> {}

const github_language_statsSchema = new Schema<IGithubLanguages, IGithubLanguagesModel>({
    _id: String,
    bytes: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
    projects: { type: Number, default: 0 }
}, {_id: false});

if (!modelAreadyDeclared()) {
    mongoose.model<IGithubLanguages, IGithubLanguagesModel>('github_language_stats', github_language_statsSchema);
}
  
function modelAreadyDeclared () {
try {
    mongoose.model('github_language_stats')  // it throws an error if the model is still not defined
    return true
} catch (e) {
    return false
}
}


export default mongoose.model<IGithubLanguages, IGithubLanguagesModel>('github_language_stats');



