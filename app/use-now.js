import { useLayoutEffect, useState } from "react";

// Start from the build time so hydration matches the prerendered HTML,
// then switch to the visitor's clock before the browser paints.
export const useNow = (buildTime) => {
  const [now, setNow] = useState(() => new Date(buildTime));
  useLayoutEffect(() => setNow(new Date()), []);
  return now;
};
