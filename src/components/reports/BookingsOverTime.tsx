import { LineChart } from "@mantine/charts";
import { Box, Divider, Stack, Text, Title } from "@mantine/core";
import { useUser } from "@realm/react";
import { useEffect, useState } from "react";

export function BookingsOverTime() {
  const user = useUser();
  const [reports, setReports] = useState<
    Array<{ _id: string; totalBookings: number }>
  >([]);

  useEffect(() => {
    async function fetchReports() {
      const response = (await user.callFunction(
        "func-booking-over-time"
      )) as Array<{ _id: Date; totalBookings: number }>;
      setReports(
        response.map((t) => ({
          _id: t._id.toLocaleString().substring(0, 10),
          totalBookings: t.totalBookings,
        }))
      );
    }
    fetchReports();
  }, [user]);

  return (
    <>
      <Box p="sm">
        <Title order={3}>Bookings over time</Title>
      </Box>
      <Divider mb="md" />
      <Box p="md">
        <Stack>
          <Text>Shows booking over time</Text>
          <LineChart
            h={300}
            data={reports}
            dataKey="_id"
            gridAxis="xy"
            curveType="linear"
            series={[{ name: "totalBookings", color: "violet.6" }]}
          />
        </Stack>
      </Box>
    </>
  );
}
