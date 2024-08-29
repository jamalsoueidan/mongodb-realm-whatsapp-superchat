import { ActionIcon, Box, BoxProps } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useLocation, useParams } from "wouter";
import { useMobile } from "../../hooks/useMobile";

export const BoxWrapper = ({
  children,
  id,
  ...props
}: { id: string; children: React.ReactNode } & BoxProps) => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const isMobile = useMobile();
  console.log(params);

  return (
    <Box
      p="sm"
      bg="white"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        ...(params.id === id
          ? { outline: "2px solid var(--mantine-color-blue-6)" }
          : {}),
      }}
      miw="200px"
      maw="300px"
      {...props}
    >
      {isMobile ? (
        <ActionIcon
          variant="transparent"
          pos="absolute"
          right="4px"
          top="4px"
          onClick={() => setLocation(`/controls/${id}`)}
        >
          <IconEdit />
        </ActionIcon>
      ) : null}
      {children}
    </Box>
  );
};
