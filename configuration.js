// Import theme
import createTheme from "spectacle/lib/themes/default";
import talks from "./talks";

const talk = talks.current;
const debug = false;

export const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#005dad",
    quartenary: "#CECECE",
    dark: "#000B14"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export const url = debug ? false : talk.spreadsheet;
export const poll = talk.form;
export const prices = talk.prices;
export const timer = 3;

export const currentTalk = talk;
export const nextTalk = talks.next ? talks.next : { title: "???" };
