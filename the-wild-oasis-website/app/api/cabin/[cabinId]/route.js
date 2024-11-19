import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
//469 video
//form this file we can export multiple function each for one http method like
// export async function POST(request, { params }) {
export async function GET(request, { params }) {
  //we need accept request as first argument it is mandetory even thought we don't need it
  const { cabinId } = params;

  //error boundaries that we set will not work here
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
