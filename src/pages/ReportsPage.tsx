import { Flex } from "@mantine/core";
import { Route } from "wouter";
import { BookingsByDays } from "../components/reports/BookingsByDays";
import { BookingsOverTime } from "../components/reports/BookingsOverTime";
import { PeakBookingTime } from "../components/reports/PeakBookingTime";
import { ReportsNavigation } from "../components/reports/ReportsNavigation";

export const ReportsPage = () => {
  return (
    <Route path="/reports/*?">
      <Flex bg="white" h="calc(100vh - 40px)">
        <ReportsNavigation />
      </Flex>
      <Route path="/reports/:page">
        {(params) => (
          <Flex>
            {params.page === "bookings-over-time" ? <BookingsOverTime /> : null}
            {params.page === "peak-booking-time" ? <PeakBookingTime /> : null}
            {params.page === "bookings-by-days" ? <BookingsByDays /> : null}
          </Flex>
        )}
      </Route>
    </Route>
  );
};
