
import { z } from "zod";

export const gymSchema = z.object({
  name: z
    .string()
    .min(3, "Gym name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  gym_type: z
   .string()
   .min(5, "Gym type must be at least 5 characters"),

  address: z.object({
    address_line_1: z
      .string()
      .min(5, "Address line 1 is required"),

    address_line_2: z
      .string()
      .optional(),

    city: z
      .string()
      .min(2, "City is required"),

    district: z
      .string()
      .min(2, "District is required"),

    state: z
      .string()
      .min(2, "State is required"),

    pincode: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),

    country: z
      .string()
      .min(2, "Country is required"),
  }),

  contact_phone: z
    .string()
    .min(10, "Enter a valid contact number"),

  email: z
    .string()
    .email("Enter a valid email address"),
});

export type GymFormValues = z.infer<typeof gymSchema>;
