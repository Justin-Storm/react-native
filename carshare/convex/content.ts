import { mutation, query } from "./_generated/server";
import { convexToJson, v } from "convex/values";

export const addPost = mutation({
    args: {
        username: v.string(),
        description: v.string(),
    },
    handler: async (ctx, { username, description }) => {
        const newPost = await ctx.db.insert("posts", {
            username,
            description,
            likes: [],
        });
        return newPost;
    }
});

export const getPosts = query({
    handler: async (ctx) => {
        const posts = ctx.db.query("posts").order("desc").collect();
        return posts;    
    }
});

export const getPost = query({
    args: { id: v.id("posts") },
    handler: async (ctx, { id }) => {
        const post = await ctx.db.get(id);
        return post;
    }
});

export const deletePost = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    }
});

export const toggleLikes = mutation({
    args: {
        id: v.id("posts"),
        userID: v.id("users"),
    },
    handler: async (ctx, { id, userID }) => {
        const post = await ctx.db.get(id);

        const updatedLikes = post?.likes.includes(userID) ? post.likes.filter(uid => uid !== userID) : [...post?.likes ?? [], userID];

        const updatedPost = await ctx.db.patch(id, {
            likes: updatedLikes
        });

        return updatedPost;
    }
})