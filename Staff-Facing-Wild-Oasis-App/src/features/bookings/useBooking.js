import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    error,
    data: booking,
    status,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // generally if query is failed the  react query excutes the query  3 times to check if it get the data or not but if we set retry to false then this behaviour will be ignored
  });

  return { isLoading, error, booking, status };
}
