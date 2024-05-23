export const useDarkSide = () => {
  return {
    toggleDarkMode: () => {
      const root = window.document.documentElement;
      const colorTheme = localStorage.theme === "dark" ? "light" : "dark";
      root.classList.add(colorTheme);
      root.classList.remove(localStorage.theme);
      localStorage.setItem("theme", colorTheme);
    },
  };
};
