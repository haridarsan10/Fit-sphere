
import mongoose, { Schema } from "mongoose";

const GymSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  gym_type: {
    type: String,
    required: true
  },

  address: {
    address_line_1: {
      type: String,
      required: true
    },
    address_line_2: {
      type: String,
      default: null
    },
    city: {
      type: String,
      required: true
    },
    district: {
      type: String,
      default: null
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      }
    }
  },

  contact_phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  owner_id: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "ACTIVE", "SUSPENDED", "REJECTED"],
    default: "PENDING"
  },

  reject_reason: {
    type: String,
    required: false,
    default: null
  },

  max_members: {
    type: Number,
    required: true,
    default: 0
  },

  max_trainers: {
    type: Number,
    required: true,
    default: 0
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: null
  },

  deleted_at: {
    type: Date,
    default: null
  }

}, { timestamps: true });

const Gym = mongoose.model("Gym", GymSchema);

export default Gym;
