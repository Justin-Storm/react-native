import { mutation, query } from "./_generated/server";
import { convexToJson, v } from "convex/values";

export const getTodos = query({
    args: { userID: v.string() },
    handler: async (ctx, { userID }) => {
        const reponse = await ctx.db
            .query("todos")
            .filter((q) => q.eq(q.field("userID"), userID))
            .order("desc")
            .collect();
        return reponse;
    }
});

export const addTodo = mutation({
    args: {
        userID: v.string(),
        title: v.string(), 
        note: v.optional(v.string()) 
    },
    handler: async (ctx, { userID, title, note }) => {
        const todo = ctx.db
            .insert("todos", { userID: userID, title: title, note: note, isCompleted: false });
        return todo;
    }
});

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, { id }) => {
        const todo = await ctx.db.get(id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        await ctx.db.patch(id, { isCompleted: !todo.isCompleted });
        return todo;
    }
});

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    }
});

export const updateTodo = mutation({
    args: { 
        id: v.id("todos"),
        title: v.string(),
        note: v.optional(v.string()),
    },
    handler: async (ctx, { id, title, note }) => {
        const todo = await ctx.db.get(id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        await ctx.db.patch(id, { title: title, note: note });
    }
})