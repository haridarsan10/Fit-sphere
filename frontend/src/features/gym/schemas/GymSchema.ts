import { z } from "zod";

const optionalText = z.string().optional();

const dailyHoursSchema = z
  .object({
    is_open: z.boolean(),
    open: z.string().optional().nullable(),
    close: z.string().optional().nullable(),
  })
  .superRefine((day, ctx) => {
    if (!day.is_open) return;

    if (!day.open) {
      ctx.addIssue({
        code: "custom",
        message: "Opening time is required",
        path: ["open"],
      });
    }

    if (!day.close) {
      ctx.addIssue({
        code: "custom",
        message: "Closing time is required",
        path: ["close"],
      });
    }

    if (day.open && day.close && day.open >= day.close) {
      ctx.addIssue({
        code: "custom",
        message: "Closing time must be after opening time",
        path: ["close"],
      });
    }
  });

export const gymSchema = z.object({
  // Basic Information
  name: z.string().min(3, "Gym name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  gym_type: z.string().min(5, "Gym type must be at least 5 characters"),

  established_year: z
    .number()
    .int()
    .min(1900, "Enter a valid established year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),

  // Address
  address: z.object({
    address_line_1: z.string().min(5, "Address line 1 is required"),
    address_line_2: optionalText,
    city: z.string().min(2, "City is required"),
    district: optionalText,
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
    country: z.string().min(2, "Country is required"),
  }),

  // Contact
  contact_phone: z.string().min(10, "Enter a valid contact number"),
  email: z.string().email("Enter a valid email address"),

  contact: z
    .object({
      alternate_phone: optionalText,
      website: optionalText,
      social_links: z
        .object({
          instagram: optionalText,
          facebook: optionalText,
          youtube: optionalText,
        })
        .optional(),
    })
    .optional(),

  // Facilities
  facilities: z.array(z.string()).default([]),

  // Operating Hours
  operating_hours: z
    .object({
      monday: dailyHoursSchema,
      tuesday: dailyHoursSchema,
      wednesday: dailyHoursSchema,
      thursday: dailyHoursSchema,
      friday: dailyHoursSchema,
      saturday: dailyHoursSchema,
      sunday: dailyHoursSchema,
    })
    .nullable()
    .optional(),

  // Business Details
  business_details: z
    .object({
      legal_name: optionalText,
      gstin: optionalText,
      registration_number: optionalText,
    })
    .optional(),

    max_members: z.number().int().min(1, "At least 1 member capacity is required"),
    max_trainers: z.number().int().min(1, "At least 1 trainer capacity is required"),
});

export type GymFormInput = z.input<typeof gymSchema>;
export type GymFormValues = z.output<typeof gymSchema>;