export const getStoreLogo = (storeName: string): string => {
  switch (storeName) {
    case "Steam":
      return "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg";
    case "Microsoft Store":
      return "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
    case "Playstation Store":
      return "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg";
    case "Nintendo Store":
      return "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg";
    case "Xbox Store":
      return "https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg";
    case "Epic Games Store":
      return "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg";
    default:
      return "/placeholder-game.jpg";
  }
};
