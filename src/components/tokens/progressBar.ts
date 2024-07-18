import { inube } from "@inubekit/foundations";

const progressBar = {
  primary: {
    animation: { color: inube.palette.blue.B50 },
    background: { color: inube.palette.blue.B400 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  success: {
    animation: { color: inube.palette.green.G50 },
    background: { color: inube.palette.green.G400 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  warning: {
    animation: { color: inube.palette.yellow.Y50 },
    background: { color: inube.palette.yellow.Y400 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  danger: {
    animation: { color: inube.palette.red.R50 },
    background: { color: inube.palette.red.R400 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  help: {
    animation: { color: inube.palette.purple.P50 },
    background: { color: inube.palette.purple.P400 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  dark: {
    animation: { color: inube.palette.neutral.N200 },
    background: { color: inube.palette.neutral.N900 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  gray: {
    animation: { color: inube.palette.neutral.N20 },
    background: { color: inube.palette.neutral.N50 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N10 },
  },
  light: {
    animation: { color: inube.palette.neutral.N0 },
    background: { color: inube.palette.neutral.N10 },
    border: { color: inube.palette.neutral.N40 },
    track: { color: inube.palette.neutral.N50 },
  },
};

export { progressBar };
