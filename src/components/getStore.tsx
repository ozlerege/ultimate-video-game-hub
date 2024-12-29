"use client";
export const getStore = (storeId: number): string => {
  switch (storeId) {
    case 1:
      return "Steam";
    case 2:
      return "Microsoft Store";
    case 3:
      return "Playstation Store";
    case 4:
      return "Apple App Store";
    case 5:
      return "GOG";
    case 6:
      return "Nintendo Store";
    case 7:
      return "Xbox Store";
    case 8:
      return "Google Play Store";
    case 9:
      return "itch.io";
    case 11:
      return "Epic Games Store";
    default:
      return "";
  }
};
