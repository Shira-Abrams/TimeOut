import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    statusBlockedSites: { type: String, enum: ['black list', 'white list'] },
    listWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open', 'limit'] },
        limitedMinutes: { type: Number, default: 0, required: true },
    }],
    timeProfile: {
        start: { type: String },
        end: { type: String }
    },
    googleMapsLocation: {
        enabled: { type: Boolean, default: false },
        location: {
            address: { type: String },
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    },
    googleCalendarEvents: {
        enabled: { type: Boolean, default: false },
        calendarId: { type: String }
    },
    googleDriveFiles: {
        enabled: { type: Boolean, default: false },
        folderId: { type: String }
    }
});

export default mongoose.model("Profiles", profileSchema);
