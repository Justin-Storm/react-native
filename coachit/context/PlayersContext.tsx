import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  heightFeet: number;
  heightInches: number;
  weight: number;
  notes?: string;
}

export interface Game {
  id: string;
  name: string;
  date: string; // ISO string or date string
  ourScore: number;
  opposingScore: number;
  players: string[]; // players in this game
}

export interface Team {
  id: string;
  name: string;
  sport: string;        // NEW: sport for the team
  players: string[];
  games: Game[];
}

interface PlayersContextType {
  players: Player[];
  teams: Team[];

  // Player management
  addPlayer: (player: Omit<Player, "id">) => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;

  // Team management
  addTeam: (teamName: string, sport: string) => void; // now requires sport
  updateTeam: (teamId: string, updatedData: Partial<Omit<Team, "players" | "games">>) => void;
  removeTeam: (teamId: string) => void;

  // Team-player relations
  addPlayerToTeam: (teamId: string, playerId: string) => void;
  removePlayerFromTeam: (teamId: string, playerId: string) => void;

  // Game management
  addGameToTeam: (teamId: string, game: Omit<Game, "id">) => void;
  updateGame: (teamId: string, gameId: string, updatedData: Partial<Game>) => void;
  removeGame: (teamId: string, gameId: string) => void;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);
const STORAGE_KEY = "@players_teams_data";

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setPlayers(parsed.players ?? []);
          setTeams(parsed.teams ?? []);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const saveData = async (playersToSave: Player[], teamsToSave: Team[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ players: playersToSave, teams: teamsToSave })
      );
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  // PLAYER FUNCTIONS
  const addPlayer = (player: Omit<Player, "id">) => {
    const newPlayer: Player = { ...player, id: Date.now().toString() };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    saveData(updatedPlayers, teams);
  };

  const updatePlayer = (id: string, updatedPlayer: Partial<Player>) => {
    const updatedPlayers = players.map(p => (p.id === id ? { ...p, ...updatedPlayer } : p));
    setPlayers(updatedPlayers);
    saveData(updatedPlayers, teams);
  };

  const removePlayer = (id: string) => {
    const updatedTeams = teams.map(team => ({
      ...team,
      players: team.players.filter(pid => pid !== id),
      games: team.games.map(game => ({
        ...game,
        players: game.players.filter(pid => pid !== id),
      })),
    }));
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers);
    setTeams(updatedTeams);
    saveData(updatedPlayers, updatedTeams);
  };

  // TEAM FUNCTIONS
  const addTeam = (teamName: string, sport: string) => {
    const newTeam: Team = { id: Date.now().toString(), name: teamName, sport, players: [], games: [] };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  const updateTeam = (teamId: string, updatedData: Partial<Omit<Team, "players" | "games">>) => {
    const updatedTeams = teams.map(team =>
      team.id === teamId ? { ...team, ...updatedData } : team
    );
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  const removeTeam = (teamId: string) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  // TEAM-PLAYER RELATIONS
  const addPlayerToTeam = (teamId: string, playerId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id !== teamId) return team;
      if (team.players.includes(playerId)) return team;
      return { ...team, players: [...team.players, playerId] };
    });
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  const removePlayerFromTeam = (teamId: string, playerId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id !== teamId) return team;
      return { ...team, players: team.players.filter(pid => pid !== playerId) };
    });
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  // GAME FUNCTIONS
  const addGameToTeam = (teamId: string, game: Omit<Game, "id">) => {
    const newGame: Game = { ...game, id: Date.now().toString() };
    const updatedTeams = teams.map(team =>
      team.id === teamId ? { ...team, games: [...team.games, newGame] } : team
    );
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  const updateGame = (teamId: string, gameId: string, updatedData: Partial<Game>) => {
    const updatedTeams = teams.map(team => {
      if (team.id !== teamId) return team;
      return {
        ...team,
        games: team.games.map(game => (game.id === gameId ? { ...game, ...updatedData } : game)),
      };
    });
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  const removeGame = (teamId: string, gameId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id !== teamId) return team;
      return {
        ...team,
        games: team.games.filter(game => game.id !== gameId),
      };
    });
    setTeams(updatedTeams);
    saveData(players, updatedTeams);
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        teams,
        addPlayer,
        updatePlayer,
        removePlayer,
        addTeam,
        updateTeam,
        removeTeam,
        addPlayerToTeam,
        removePlayerFromTeam,
        addGameToTeam,
        updateGame,
        removeGame,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) throw new Error("usePlayers must be used within a PlayersProvider");
  return context;
};
