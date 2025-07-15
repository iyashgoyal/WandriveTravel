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
  highlights: text("highlights").array(),
  rating: integer("rating").default(0),
  reviews: integer("reviews").default(0),
  location: text("location"),
  image: text("image")
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  travelDates: text("travel_dates"),
  budget: integer("budget"),
  packageId: integer("package_id").references(() => packages.id),
  createdAt: text("created_at")
});

export const insertPackageSchema = createInsertSchema(packages).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true });

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