import { InstallOptions } from "ui-transition/dist/src/types";

export default {
  transitions: {
    slideY: (from = 100, to = 0, unit = "%") => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `translate3d(0,${step(from, to)}${unit},0)`,
          },
          leave: {
            transform: `translate3d(0,${step(to, from)}${unit},0)`,
          },
        };

        return build[phase];
      },
    }),

    scale: (from = 0, to = 1) => ({
      frame: (step, phase) => {
        const build = {
          enter: {
            transform: `scale3d(${step(from, to)},${step(from, to)},1)`,
          },
          leave: {
            transform: `scale3d(${step(to, from)},${step(to, from)},1)`,
          },
        };

        return build[phase];
      },
    }),
  },
} as InstallOptions;
