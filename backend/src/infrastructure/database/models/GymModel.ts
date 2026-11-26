
import mongoose, { Schema } from "mongoose";

const DailyOperatingHoursSchema = new Schema(
  {
    is_open: {
      type: Boolean,
      required: true,
      default: false,
    },
    open: {
      type: String,
      default: null,
    },
    close: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);



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

  established_year: {
    type: Number,
    default: null
  },

  contact_phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  contact: {
    alternate_phone: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    social_links: {
      instagram: {
        type: String,
        default: null,
      },
      facebook: {
        type: String,
        default: null,
      },
      youtube: {
        type: String,
        default: null,
      },
    },
  },

  owner_id: {
    type: String,
    required: true
  },

  facilities: {
    type: [String],
    default: [],
  },

  operating_hours: {
    monday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    tuesday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    wednesday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    thursday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    friday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    saturday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
    sunday: {
      type: DailyOperatingHoursSchema,
      default: () => ({}),
    },
  },

  business_details: {
    legal_name: {
      type: String,
      default: null,
    },
    gstin: {
      type: String,
      default: null,
    },
    registration_number: {
      type: String,
      default: null,
    },
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

  status: {
    type: String,
    enum: ["DRAFT","PENDING", "ACTIVE", "SUSPENDED", "REJECTED"],
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
