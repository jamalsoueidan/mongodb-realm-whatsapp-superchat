import { Box, Divider, NavLink, NavLinkProps, Title } from "@mantine/core";
import { Link, useRoute } from "wouter";

const ActiveLink = (props: NavLinkProps & { to: string }) => {
  const [isActive] = useRoute(props.to);
  return <NavLink component={Link} {...props} active={isActive} />;
};

export function ReportsNavigation() {
  return (
    <>
      <Box p="md">
        <Title order={2}>Reporting</Title>
      </Box>
      <Divider />
      <ActiveLink to="/reports/bookings-over-time" label="Bookings over time" />
      <ActiveLink to="/reports/peak-booking-time" label="Peak booking time" />
      <ActiveLink to="/reports/bookings-by-days" label="Bookings by days" />
    </>
  );
}
