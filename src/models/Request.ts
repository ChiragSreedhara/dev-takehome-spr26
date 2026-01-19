import { Schema, model, models } from 'mongoose';

const RequestSchema = new Schema({
  requestorName: {
    type: String,
    required: true,
    minlength: 3, 
    maxlength: 30,
  },
  itemRequested: {
    type: String,
    required: true,
    minlength: 2, 
    maxlength: 100,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'approved', 'rejected'], 
    default: 'pending',
  },
  createdDate: { type: Date, required: true, default: Date.now },
  lastEditedDate: { type: Date },
});

export default models.Request || model('Request', RequestSchema);