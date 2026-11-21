
import mongoose, { Schema } from "mongoose";

const GymMediaSchema = new Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },

    gym_id: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "LOGO",
        "COVER_IMAGE",
        "GALLERY",
        "FACILITY",
        "VERIFICATION_DOCUMENT",
      ]
    },

    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    file_name: {
      type: String,
      default: null,
    },

    mime_type: {
      type: String,
      default: null,
    },

    file_size: {
      type: Number,
      default: null,
      min: 1,
    },

    caption: {
      type: String,
      default: null,
    },

    display_order: {
      type: Number,
      default: 0,
      min: 0,
    },

    deleted_at: {
      type: Date,
      default: null,
    },

    created_at: {
      type: Date,
      default: Date.now
    },

    updated_at: {
      type: Date,
      default: null
    },
  },{ timestamps: true }
);

GymMediaSchema.index({ gym_id: 1, type: 1 });

const GymMediaModel = mongoose.model("GymMedia", GymMediaSchema);

export default GymMediaModel;
