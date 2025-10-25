export const sports = [
    'Baseball',
    'Football',        
    'Basketball',
    'Soccer',
];

export const getTeamIcon = (sport: string) => {
    switch (sport) {
        case "baseball":
            return "baseball"
        case "football":
            return "football"
        case "basketball":
            return "basketball"
        case "soccer":
            return "soccerball"
        default:
            return "circle.fill"
    }
}

export const colors = [
  // Reds
  "#DC143C",
  "#FF2400",
  "#E0115F",
  "#C21807",
  "#E34234",

  // Blues
  "#4169E1",
  "#7DF9FF",
  "#001F3F",
  "#87CEEB",
  "#00FFFF",

  // Greens
  "#50C878",
  "#A7F432",
  "#228B22",
  "#98FF98",
  "#008080",

  // Purples
  "#4B0082",
  "#8A2BE2",
  "#CBA0E3",
  "#FF00FF",
  "#673AB7",

  // Oranges & Yellows
  "#FFBF00",
  "#FF9500",
  "#FF7F50",
  "#FFDB58",
  "#CC5500",

  // Neutrals
  "#36454F",
  "#2C3539",
  "#C0C0C0",
  "#383838",
  "#0A0A0A",
];