import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category").notNull(),
  destination: text("destination").notNull(),
  highlights: text("highlights").array().notNull(),
  itinerary: text("itinerary").array().notNull(),
  rating: integer("rating").default(0),
  reviews: integer("reviews").default(0),
  location: text("location").notNull().default(""),
  image: text("image").notNull().default("")
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  cityOfResidence: text("city_of_residence").notNull(),
  phoneNumber: text("phone_number").notNull(),
  whatsapp: text("whatsapp"),
  travelDestination: text("travel_destination").notNull(),
  dateOfTravel: text("date_of_travel").notNull(),
  numberOfPeople: integer("number_of_people").notNull(),
  vacationType: text("vacation_type").notNull(),
  budgetRange: text("budget_range").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertPackageSchema = createInsertSchema(packages).omit({ id: true });

export const insertInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  cityOfResidence: z.string().min(1, "City is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().optional(),
  travelDestination: z.string().min(1, "Travel destination is required"),
  dateOfTravel: z.string().min(1, "Date of travel is required"),
  numberOfPeople: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Must be at least 1 person").max(100, "Maximum 100 people")
  ),
  vacationType: z.string().min(1, "Vacation type is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  message: z.string().optional(),
});

export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export const searchParamsSchema = z.object({
  category: z.string().optional(),
  destination: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minDuration: z.string().optional(),
  maxDuration: z.string().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'duration_asc', 'duration_desc']).optional(),
  subCategory: z.string().optional(),
  search: z.string().optional()
});

export type SearchParams = z.infer<typeof searchParamsSchema>;