module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "300px",
      sm: "640px",
      md: "768px",
      lg: "1024",
      xl: "1280",
      xlg: "1536",
    },

    extend: {
      colors: {
        bodyGrey: "#e5e5e5",
        bodyBrown: "#D2691E",
        buttonGreen: "#016450",
        textGrey: "#767676",
        barOrange: "#ff8433",
        backdrop: "rgba(0, 0, 0, 0.5)",
        backdrop2: "rgba(0, 0, 0, 0.8)",
        bgRed: "#DF7D45",
        default: "#F7F7F7",
        design: "#F2F2F8",
        dgray: "#6e6b7b",
        dgray2: "#BAB7C3",
        darkBlue: "#151567 ",
        dtext: "#151567",
        blight: "#e9ecef",
        bglblue: "#eff0f8",
        bgTrade: "#374f63",
        neuro: "#F1F5F9",
      },

      boxShadow: {
        blend: "0 1px 0 0 transparent, 0 2px 10px 0 rgb(0 0 0 / 10%)",
        dcs: "0 4px 24px 0 rgb(34 41 47 / 10%)",
        neuro:
          "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5);",
        neuroFlat: " 20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
        neuroInward: "",
        neumoNav:
          " 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 15%)",
        neuroInsert:
          "-1px -1px 0px #ffffff, -2px -2px 2px #b8cce0, inset -1px -1px 0px #ffffff, inset -2px -2px 2px #b8cce0",
        neuroRaise: "8px 8px 16px #C9D9E8, -8px -8px 16px #FFFFFF",
      },

      fontFamily: {
        "arial-arounded": ["Arial Rounded MT Bold"],
        "helvetica-neue": ["Helvetica Neue"],
        "rale-way": ["Railway"],
        roboto: ["Roboto"],
        arial: ["arial"],
      },
      keyframes: {
        rotate: {
          from: { transform: "rotateZ(0deg)" },
          to: { transform: "rotateZ(360deg)" },
        },
        fadeIn: {
          from: { opacity: 0.5 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        rise: {
          from: { transform: "translate(0px,0); opacity: 0.4" },
          to: { transform: "translate(0px,-4px);opacity: 1" },
        },
        descend: {
          from: { transform: "translate(0px,-4px);opacity: 1" },
          to: { transform: "translate(0px,200px); opacity: 0.4" },
        },
        slideDownVanish: {
          from: {
            transform: "translate(0px, -12px)",
            opacity: 1,
          },
          to: {
            transform: "translate(0px, 0)",
            opacity: 0.4,
          },
        },
        bgChange: {
          from: {
            background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
          },
          to: {
            background: "linear-gradient(326deg, #5f0a87 0%, #db5151 74%)",
          },
        },
        zoomIn: {
          from: {
            width: "200px",
            height: "auto",
          },
          to: {
            width: "400px",
            height: "auto",
          },
        },
        zoomOut: {
          from: {
            transform: "scale(1.5)",
          },
          to: {
            transform: "scale(1.0)",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.2s ease 0s 1 normal forwards running",
        fadeOut: "fadeOut 0.2s ease 0s 1 normal forwards running",
        rotate: "rotate 100s linear infinite",
        rise: "rise 0.2s ease 0s 1 normal forwards running",
        descend: "descend  0.2s ease 0s 1 normal forwards running",
        bgChange: "bgChange  2s linear 0s infinite normal forwards running",
        slideDownVanish: "slideDownVanish 0.2s linear forwards ",
        zoomIn: "zoomIn 0.2s linear forwards ",
        zoomOut: "zoomOut 0.2s linear forwards ",
      },

      content: {
        link: 'url("/icons/link.svg")',
      },
    },
  },
  plugins: [],
};
