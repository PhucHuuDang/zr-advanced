import { Metadata } from "next";

export const metaConfig: Metadata = {
  title: {
    default: "StateManager",
    template: "%s | StateManager",
  },
  icons: {
    icon: "/icons/code.svg",
  },

  authors: [
    {
      name: "Harry Dang",
      url: "https://github.com/harrydang",
    },
  ],
  keywords: ["React", "Zustand", "Redux", "State Management", "StateManager"],
  description: "StateManager is a state management library for React",

  category: "technology",
  facebook: {
    appId: "HP2K2Official",
  },

  creator: "Harry Dang",
};
