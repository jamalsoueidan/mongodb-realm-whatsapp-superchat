import { BarChart } from "@mantine/charts";
import { Box, Divider, Stack, Text, Title } from "@mantine/core";
import { useUser } from "@realm/react";
import { useEffect, useState } from "react";

type BookingsByDays = {
  _id: string;
  totalBookings: number;
};

export function BookingsByDays() {
  const user = useUser();
  const [reports, setReports] = useState<Array<BookingsByDays>>([]);

  useEffect(() => {
    async function fetchReports() {
      const response = (await user.callFunction(
        "func-bookings-by-days"
      )) as Array<BookingsByDays>;
      setReports(response);
    }
    fetchReports();
  }, []);

  return (
    <>
      <Box p="sm">
        <Title order={3}>Bookings By Days</Title>
      </Box>
      <Divider mb="md" />
      <Box p="md">
        <Stack>
          <Text>Shows bookings by the day of the week</Text>
          <BarChart
            h={300}
            data={reports}
            dataKey="_id"
            type="stacked"
            series={[{ name: "totalBookings", color: "violet.6" }]}
          />
        </Stack>
      </Box>
    </>
  );
}
