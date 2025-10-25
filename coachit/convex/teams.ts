import { mutation, query } from "./_generated/server";
import { convexToJson, v } from "convex/values";

export const getPlayers = query({
    handler: async (ctx) => {
        const players = await ctx.db
            .query("players")
            .collect();
        return players;
    }
});

export const getPlayer = query({
    args: { id: v.id("players") },
    handler: async (ctx, { id }) => {
        const player = ctx.db.get(id);
        return player;
    }
})

export const addPlayer = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        heightFeet: v.string(),
        heightInches: v.string(),
        weight: v.string(),
        notes: v.string(),
    },
    handler: async (ctx, { firstName, lastName, heightFeet, heightInches, weight, notes }) => {
        const newPlayer = await ctx.db.insert("players", {
            firstName,
            lastName,
            heightFeet,
            heightInches,
            weight,
            notes,
        });
        return newPlayer;
    }
});

export const updatePlayer = mutation({
    args: {
        id: v.id("players"),
        firstName: v.string(),
        lastName: v.string(),
        heightFeet: v.optional(v.string()),
        heightInches: v.optional(v.string()),
        weight: v.optional(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, { id, firstName, lastName, heightFeet, heightInches, weight, notes }) => {
        const player = ctx.db.get(id);
        if (!player) throw new Error("Player not found");

        const newPlayer = {
            firstName: firstName,
            lastName: lastName,
            heightFeet: heightFeet,
            heightInches: heightInches,
            weight: weight,
            notes: notes,
        };

        const updatedPlayer = await ctx.db.patch(id, newPlayer);
        return updatedPlayer;
    }
});

export const deletePlayer = mutation({
    args: { id: v.id("players") },
    handler: async (ctx, { id }) => {
        const teams = await ctx.db
            .query("teams")
            .collect();

        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
             if (team.players && team?.players?.includes(id)) {
                const updatedPlayers = team?.players?.filter(playerID => playerID !== id) || [];
                await ctx.db.patch(team._id, { players: updatedPlayers });
            }
        }
        
        const response = await ctx.db.delete(id);
        return response;
    }
});

export const getTeams = query({
    handler: async (ctx) => {
        const teams = ctx.db
            .query("teams")
            .collect();
        return teams;
    }
});

export const getTeam = query({
    args: { id: v.id("teams") },
    handler: async (ctx, { id }) => {
        const team = ctx.db.get(id);
        if (!team) throw new Error("Team not found");
        return team;
    }   
});

export const addTeam = mutation({
    args: { name: v.string(), sport: v.string(), color: v.string() },
    handler: async (ctx, { name, sport, color }) => {
        const newTeam = ctx.db.insert("teams", {
            name: name,
            sport: sport,
            color: color,
            players: [],
            games: [],
        });
        return newTeam;
    }
});

export const updateTeam = mutation({
    args: {
        id: v.id("teams"),
        name: v.string(),
        sport: v.string(),
        color: v.string(),
        players: v.optional(v.array(v.string())),
    },
    handler: async (ctx, { id, name, sport, color, players }) => {
        const team = ctx.db.get(id);
        if (!team) throw new Error("Team not found");

        const updatedTeam = await ctx.db.patch(id, {
            name: name,
            sport: sport,
            color: color,
            players: players,
        });
        return updatedTeam;
    }
})

export const deleteTeam = mutation({
    args: { id: v.id("teams") },
    handler: async (ctx, { id }) => {
        const response = await ctx.db.delete(id);
        return response;
    }
});

export const getGames = query({
    args: { id: v.id("teams") },
    handler: async (ctx, { id }) => {
        const team = await ctx.db.get(id);
        if (!team) throw new Error("Team not found");

        const games = team.games;
        return games;
    }
});

export const addGame = mutation({
    args: { 
        teamID: v.id("teams"),
        id: v.string(),
        name: v.string(),
        date: v.string(),
        ourScore: v.string(),
        opposingName: v.string(),
        opposingScore: v.string(),
    },
    handler: async (ctx, { teamID, id, name, date, ourScore, opposingName, opposingScore }) => {
        const team = await ctx.db.get(teamID);
        if (!team) throw new Error("Team not found");

        const updatedGames = [
            ...(team.games || []),
            {
                id,
                name,
                date,
                ourScore,
                opposingName,
                opposingScore,
            },
        ];

        await ctx.db.patch(teamID, { games: updatedGames });
    }
});