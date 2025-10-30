import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  appUsers: defineTable({
    userID: v.string(),
    username: v.string(),
    profilePicture: v.optional(v.any()),
    description: v.optional(v.string()),
    websiteURL: v.optional(v.string()),
  }),
  posts: defineTable({
    username: v.string(),
    description: v.string(),
    likes: v.array(v.string()),
  })
});
