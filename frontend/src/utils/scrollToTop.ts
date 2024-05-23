export const scrollToTop = (x: number | undefined) => {
  if (x !== undefined)
    document
      .getElementById("landing")
      ?.scrollTo({ top: x, behavior: "smooth" });
};
