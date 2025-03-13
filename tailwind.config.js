module.exports = {
  content: ["./src*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "h1-1": ["40px", { lineHeight: "normal", letterSpacing: "normal" }],
        "h1-2": ["40px", { lineHeight: "normal", letterSpacing: "normal" }],
        "h2-1": ["32px", { lineHeight: "normal", letterSpacing: "normal" }],
        "h2-2": ["32px", { lineHeight: "normal", letterSpacing: "normal" }],
        "h2-bold-1": ["32px", { lineHeight: "normal", fontWeight: "bold" }],
        "h3-bold-1": ["24px", { lineHeight: "normal", fontWeight: "bold" }],
        "h3-bold-2": ["24px", { lineHeight: "normal", fontWeight: "bold" }],
        "h3-reg-1": ["24px", { lineHeight: "normal" }],
        "body-bold-1": ["20px", { lineHeight: "normal", fontWeight: "bold" }],
        "body-medium-1": [
          "20px",
          { lineHeight: "1.5", letterSpacing: "-0.38px", fontWeight: "500" },
        ],
        "body-reg-1": ["20px", { lineHeight: "1.5", letterSpacing: "-0.38px" }],
        "body-regular": ["16px", { lineHeight: "normal" }],
      },
      colors: {
        primary: {
          button: "var(--primary-button)",
          highlight: "var(--primary-highlight)",
          brown: "var(--primary-brown)",
          demo: "var(--primary-demo)",
          submit: "var(--primary-submit)",
          success: "var(--primary-success)",
        },
        neutral: {
          body: "var(--neutral-body)",
          highlight: "var(--neutral-highlight)",
          grey: "var(--neutral-grey)",
          brown: "var(--neutral-brown)",
          form: "var(--neutral-form)",
          loading: "var(--neutral-loading)",
        },
        secondary: {
          helper: "var(--secondary-helper)",
        },
      },
    },
  },
  plugins: [],
};
