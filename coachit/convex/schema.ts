import { defineTable, defineSchema } from 'convex/server';
import { v } from "convex/values";

export default defineSchema({
    players: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        heightFeet: v.string(),
        heightInches: v.string(),
        weight: v.string(),
        notes: v.optional(v.string()),
    }),
    teams: defineTable({
        name: v.string(),
        sport: v.string(),
        color: v.string(),
        players: v.optional(v.array(v.string())),
        games: v.optional(v.array(
            v.object({
                id: v.string(),
                name: v.string(),
                date: v.string(),
                ourScore: v.string(),
                opposingName: v.string(),
                opposingScore: v.string(),
            })
        ))
    })
})