import { createTheme } from '@mui/material/styles';

const main_font_family = "'IBM Plex Sans', sans-serif";
const wa_colors = {
  wa_body: '#333',
  primary: '#78B6B2',
  primary_hover: '#A0CEC4',
  text_secondary: '#3D3D3D',
}

const t = createTheme();

export default createTheme({
    ...t,
    // now customize...
    palette: {
        primary: {
          main: wa_colors.primary,
        },
        info: {
          main: '#D8D8D8',
        },
        text: {
          secondary: wa_colors.text_secondary,
          wa_body: wa_colors.wa_body,
        },
    },
    typography: {
        fontFamily: main_font_family,
        fontWeight: '600',
        poster: {
            color: '#1A2733',
        },
        
        h1: {
          fontFamily: main_font_family,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.up("md")]: {
            fontSize: 80,
          },
          [t.breakpoints.only("sm")]: {
            fontSize: 64,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 48,
          },
        },

        h2: {
          fontFamily: main_font_family,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.up("md")]: {
            fontSize: 54,
          },
          [t.breakpoints.only("sm")]: {
            fontSize: 42,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 36,
          },
        },

        h3: {
          fontFamily: main_font_family,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.up("md")]: {
            fontSize: 40,
          },
          [t.breakpoints.only("sm")]: {
            fontSize: 36,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 28,
          },
        },

        h4: {
          fontFamily: main_font_family,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.up("md")]: {
            fontSize: 32,
          },
          [t.breakpoints.only("sm")]: {
            fontSize: 28,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 24,
          },
        },

        h5: {
          fontFamily: main_font_family,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.up("md")]: {
            fontSize: 22,
          },
          [t.breakpoints.only("sm")]: {
            fontSize: 20,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 18,
          },
        },

        h6: {
          fontFamily: main_font_family,
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '1px',
          [t.breakpoints.only("sm")]: {
            fontSize: 18,
          },
          [t.breakpoints.only("xs")]: {
            fontSize: 16,
          },
        },
    },
    components: {
        MuiButton: { 
            styleOverrides: {
                contained: { 
                    color: 'white', 
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize:'1rem',
                },
            },
        },
        MuiLink: {
          styleOverrides: {
              root: {
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': {
                  color: wa_colors.primary_hover,
                },
              },
          },
        },
    },
    TablePagination: {
        rowsPerPage: {
            display: 'flex',
            border: '1px solid black',
        },
    },
    FormLabel: {
        fontSize: '2rem',
    },
});
