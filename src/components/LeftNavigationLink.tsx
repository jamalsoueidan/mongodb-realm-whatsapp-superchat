import { ActionIcon, Tooltip } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { Link, useRoute } from "wouter";

export function LeftNavigationLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: Icon;
}) {
  const [isActive] = useRoute(`${to}/*?`);
  const Component = icon;

  return (
    <Tooltip label={label} position="bottom">
      <ActionIcon
        bg={isActive ? "white" : "transparent"}
        variant="transparent"
        color={isActive ? "black" : "#555"}
        aria-label={label}
        radius="xl"
        size="lg"
        component={Link}
        to={to}
      >
        <Component
          style={{ width: "70%", height: "70%" }}
          stroke={isActive ? "1.5" : "1"}
        />
      </ActionIcon>
    </Tooltip>
  );
}
