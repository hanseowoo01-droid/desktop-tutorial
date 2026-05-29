/** AI서퍼 Design System — Tailwind theme extension
 *  Mirrors design-system/tokens.css. Merge into your tailwind.config.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { 50: "#0e4dff" },
        gray: { 0: "#ffffff", 10: "#f5f5f5", 95: "#1a1a1a" },
        navy: {
          10: "#eceef3",
          30: "#bdc3d4",
          40: "#98a0b7",
          base: "#20283f",
        },
        text: { DEFAULT: "#1f2937" },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ["72px", { lineHeight: "1.2", letterSpacing: "1.44px", fontWeight: "700" }],
        h1: ["42px", { lineHeight: "1.3", fontWeight: "700" }],
        h2: ["36px", { lineHeight: "1.4", fontWeight: "400" }],
        h3: ["24px", { lineHeight: "1.4", fontWeight: "700" }],
        lead: ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["16px", { lineHeight: "1.2", fontWeight: "600" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "6px", md: "8px", lg: "34px", xl: "42px", full: "9999px",
      },
      boxShadow: {
        gnb: "0px 8px 12px rgba(0,0,0,0.3)",
        card: "0px 14px 10px rgba(0,0,0,0.3)",
        button: "0px 4px 4px rgba(0,0,0,0.12)",
      },
      backdropBlur: { glass: "15px" },
      spacing: {
        2: "2px", 6: "6px", 10: "10px", 12: "12px", 14: "14px",
        20: "20px", 30: "30px", 60: "60px", 90: "90px",
      },
      height: { gnb: "72px" },
    },
  },
};
