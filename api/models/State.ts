import mongoose, { Schema } from 'mongoose'


const portfolio_stateSchema = new Schema({
    lastUpdate: Date,
});


export default mongoose.model('portfolio_state') || mongoose.model('portfolio_state', portfolio_stateSchema);