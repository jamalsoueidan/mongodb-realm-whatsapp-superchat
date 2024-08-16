import { BarChart } from "@mantine/charts";
import { Box, Divider, Stack, Text, Title } from "@mantine/core";
import { useUser } from "@realm/react";
import { useEffect, useState } from "react";

type PeakBookingTime = {
  _id: string;
  totalBookings: number;
};

export function PeakBookingTime() {
  const user = useUser();
  const [reports, setReports] = useState<Array<PeakBookingTime>>([]);

  useEffect(() => {
    async function fetchReports() {
      const response = (await user.callFunction(
        "func-peak-booking-time"
      )) as Array<PeakBookingTime>;
      setReports(response);
    }
    fetchReports();
  }, []);

  return (
    <>
      <Box p="sm">
        <Title order={3}>Peak booking time</Title>
      </Box>
      <Divider mb="md" />
      <Box p="md">
        <Stack>
          <Text>Shows peak booking time</Text>
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
