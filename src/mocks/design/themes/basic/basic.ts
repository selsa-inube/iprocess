const palette = {
  neutral: {
    N900: "#091E42",
    N800: "#172B4D",
    N700: "#253858",
    N600: "#344563",
    N500: "#42526E",
    N400: "#505F79",
    N300: "#5E6C84",
    N200: "#6B778C",
    N100: "#7A869A",
    N90: "#8993A4",
    N80: "#97A0AF",
    N70: "#A5ADBA",
    N60: "#B3BAC5",
    N50: "#C1C7D0",
    N40: "#DFE1E6",
    N30: "#EBECF0",
    N20: "#F4F5F7",
    N10: "#FAFBFC",
    N0: "#FFFFFF",
  },
  neutralAlpha: {
    N900A: "rgba(9, 30, 66, 1)",
    N800A: "rgba(9, 30, 66, 0.95)",
    N700A: "rgba(9, 30, 66, 0.89)",
    N600A: "rgba(9, 30, 66, 0.82)",
    N500A: "rgba(9, 30, 66, 0.77)",
    N400A: "rgba(9, 30, 66, 0.71)",
    N300A: "rgba(9, 30, 66, 0.66)",
    N200A: "rgba(9, 30, 66, 0.60)",
    N100A: "rgba(9, 30, 66, 0.54)",
    N90A: "rgba(9, 30, 66, 0.48)",
    N80A: "rgba(9, 30, 66, 0.42)",
    N70A: "rgba(9, 30, 66, 0.36)",
    N60A: "rgba(9, 30, 66, 0.31)",
    N50A: "rgba(9, 30, 66, 0.25)",
    N40A: "rgba(9, 30, 66, 0.13)",
    N30A: "rgba(9, 30, 66, 0.08)",
    N20A: "rgba(9, 30, 66, 0.04)",
    N10A: "rgba(9, 30, 66, 0.02)",
    N0A: "rgba(9, 30, 66, 0)",
  },
  red: {
    R500: "#BF2600",
    R400: "#DE350B",
    R300: "#FF5630",
    R200: "#FF7452",
    R100: "#FF8F73",
    R75: "#FFBDAD",
    R50: "#FFEBE6",
  },
  yellow: {
    Y500: "#FF8B00",
    Y400: "#FF991F",
    Y300: "#FFAB00",
    Y200: "#FFC400",
    Y100: "#FFE380",
    Y75: "#FFF0B3",
    Y50: "#FFFAE6",
  },
  green: {
    G500: "#006644",
    G400: "#00875A",
    G300: "#36B37E",
    G200: "#57D9A3",
    G100: "#79F2C0",
    G75: "#ABF5D1",
    G50: "#E3FCEF",
  },
  blue: {
    B500: "#0747A6",
    B400: "#0052CC",
    B300: "#0065FF",
    B200: "#2684FF",
    B100: "#4C9AFF",
    B75: "#B3D4FF",
    B50: "#DEEBFF",
  },
  teal: {
    T500: "#008DA6",
    T400: "#00A3BF",
    T300: "#00B8D9",
    T200: "#00C7E6",
    T100: "#79E2F2",
    T75: "#B3F5FF",
    T50: "#E6FCFF",
  },
  purple: {
    P500: "#403294",
    P400: "#5243AA",
    P300: "#6554C0",
    P200: "#8777D9",
    P100: "#998DD9",
    P75: "#C0B6F2",
    P50: "#EAE6FF",
  },
};

const businessUnitTheme = {
  palette: palette,

  progressBar: {
    primary: {
      animation: { color: palette.blue.B50 },
      background: { color: palette.blue.B400 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    success: {
      animation: { color: palette.green.G50 },
      background: { color: palette.green.G400 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    warning: {
      animation: { color: palette.yellow.Y50 },
      background: { color: palette.yellow.Y400 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    danger: {
      animation: { color: palette.red.R50 },
      background: { color: palette.red.R400 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    help: {
      animation: { color: palette.purple.P50 },
      background: { color: palette.purple.P400 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    dark: {
      animation: { color: palette.neutral.N200 },
      background: { color: palette.neutral.N900 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    gray: {
      animation: { color: palette.neutral.N20 },
      background: { color: palette.neutral.N50 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N10 },
    },
    light: {
      animation: { color: palette.neutral.N0 },
      background: { color: palette.neutral.N10 },
      border: { color: palette.neutral.N40 },
      track: { color: palette.neutral.N50 },
    },
  },
  input: {
    border: {
      color: {
        regular: palette.neutral.N40,
        disabled: palette.neutral.N40,
        focus: palette.blue.B300,
        invalid: palette.red.R400,
      },
    },
    background: {
      color: {
        regular: palette.neutral.N0,
        disabled: palette.neutral.N10,
      },
    },
    content: {
      color: {
        regular: palette.neutral.N900,
        disabled: palette.neutral.N70,
      },
    },
    placeholder: {
      color: {
        regular: palette.neutral.N300,
      },
    },
    message: {
      color: {
        regular: palette.red.R400,
      },
    },
    required: {
      color: {
        regular: palette.red.R400,
        disabled: palette.neutral.N70,
      },
    },
    optionList: {
      appearance: {
        regular: "dark",
        expanded: "primary",
      },
      background: {
        selected: palette.neutral.N30,
        expanded: palette.neutral.N0,
      },
    },
  },
  optionsPeriod: {
    border: {
      color: {
        regular: palette.neutral.N0,
        focus: palette.blue.B300,
      },
    },
    background: {
      color: {
        regular: palette.neutral.N0,
        selected: palette.neutral.N30,
      },
    },
    content: {
      color: {
        regular: palette.neutral.N900,
        disabled: palette.neutral.N70,
      },
    },
    optionList: {
      appearance: {
        regular: "dark",
        expanded: "primary",
      },
      background: {
        selected: palette.neutral.N30,
      }
    }
  }
};

export { businessUnitTheme };
