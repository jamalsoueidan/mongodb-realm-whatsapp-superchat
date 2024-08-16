import { useMantineTheme } from "@mantine/core";
import { useWindowDimensions } from "./useMediaDimensions";

export const useMobile = () => {
  const theme = useMantineTheme();
  return useWindowDimensions(parseInt(theme.breakpoints.md) * 16);
};
