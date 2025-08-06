import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId: id } = useParams();
  console.log("useBooking ===", id);

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(id)),
    retry: false,
  });

  return { isLoading, booking, error };
}
