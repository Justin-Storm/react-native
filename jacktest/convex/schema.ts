import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    todos: defineTable({
        userID: v.string(),
        title: v.string(),
        note: v.optional(v.string()),
        isCompleted: v.boolean(),
    })
})