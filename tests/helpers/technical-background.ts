import type { Locator } from "@playwright/test";

export const technicalBackgroundLayer = (shell: Locator) =>
  shell.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    return {
      backgroundImage: style.backgroundImage,
      backgroundSize: style.backgroundSize,
      animationName: style.animationName,
      animationDuration: style.animationDuration,
      animationTimingFunction: style.animationTimingFunction,
      animationIterationCount: style.animationIterationCount,
      transform: style.transform,
    };
  });
