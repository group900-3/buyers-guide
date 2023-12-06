/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  // 其他配置项 ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('assets/logo.svg')",
        "iPhone-15-Pro": "url('assets/iPhone-15-Pro.svg')",
        "iPhone-15": "url('assets/iPhone-15.svg')",
        iPhone_SE: "url('assets/iPhone-SE.svg')",
        "12-9-iPad-Pro": "url('assets/12-9-iPad-Pro.svg')",
        "11-iPad-Pro": "url('assets/11-iPad-Pro.svg')",
        "iPad-Air": "url('assets/iPad-Air.svg')",
        iPad_Mini: "url('assets/iPad-Mini.svg')",
        iPad: "url('assets/iPad.svg')",
      },
      width: {
        17: "4.375rem",
        70: "17.5rem",
      },
      colors: {
        "i-blue": "#0271E3",
      },
      spacing: {
        "0-4": "0",
        "1-4": "25%",
        "2-4": "50%",
        "3-4": "75%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: ["left-0-4", "left-1-4", "left-2-4", "left-3-4"],
};
