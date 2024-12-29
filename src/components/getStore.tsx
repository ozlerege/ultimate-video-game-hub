"use client";
export const getStore = (storeId: number): string => {
  switch (storeId) {
    case 1:
      return "Steam";
    case 2:
      return "Microsoft Store";
    case 3:
      return "Playstation Store";
    case 6:
      return "Nintendo Store";
    case 7:
      return "Xbox Store";
    case 11:
      return "Epic Games Store";
    default:
      return "";
  }
};