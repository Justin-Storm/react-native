import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from 'convex/values';

function generateUsername() {
  const adjectives = [
    "fast",
    "cool",
    "sleek",
    "drift",
    "turbo",
    "wild",
    "crazy",
    "epic",
    "smooth",
    "bold",
  ];

  const nouns = [
    "driver",
    "racer",
    "machine",
    "wheel",
    "clutch",
    "engine",
    "lane",
    "rider",
    "car",
    "king",
  ];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 900) + 100; // 100–999

  return `${randomAdj}${randomNoun}${randomNum}`;
}


export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getAppUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("appUsers").collect();
    return users;
  }
});

export const getAppUser = query({
  args: { userID: v.string() },
  handler: async (ctx, { userID }) => {
    const appUser = await ctx.db
      .query("appUsers")
      .filter(q => q.eq(q.field("userID"), userID))
      .first()

    return appUser;
  }
})

export const addUser = mutation({
  args: { userID: v.string() },
  handler: async (ctx, { userID }) => {
    const newUser = await ctx.db.insert("appUsers", {
      userID: userID,
      username: generateUsername(),
    });

    return newUser;
  }
});

export const deleteUser = mutation({
  handler: async (ctx) => {
    const userID = await getAuthUserId(ctx);
    if (!userID) throw new Error("No user found");
    await ctx.db.delete(userID);

    const appUser = await ctx.db
      .query("appUsers")
      .filter(q => q.eq(q.field("userID"), userID))
      .first();
    const appUserID = appUser?._id;
    await ctx.db.delete(appUserID!);

    const authUser = await ctx.db
      .query("authAccounts")
      .filter(q => q.eq(q.field("userId"), userID))
      .first();
    const authUserID = authUser?._id;
    await ctx.db.delete(authUserID!);


    return { success: true };
  }
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const url = await ctx.storage.generateUploadUrl();
    return url;
  }
});

export const updateProfilePicture = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const userId = await getAuthUserId(ctx);

    const user = await ctx.db
      .query("appUsers")
      .filter((q) => q.eq(q.field("userID"), userId))
      .first();

    await ctx.db.patch(user?._id!, { profilePicture: storageId });

    const imageUrl = await ctx.storage.getUrl(storageId);
    await ctx.db.patch(user?._id!, { profilePicture: imageUrl });

    return { success: true, message: "Profile image saved", imageUrl };
  },
});
