import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'},
    language:{type:String, default:'en',emun:['en', 'he', 'es']}
})
export default mongoose.model('Preference',PreferenceSchema);
