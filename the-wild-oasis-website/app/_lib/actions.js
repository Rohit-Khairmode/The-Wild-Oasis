"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  console.log(newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile"); //to update cache for this route
}

export async function updateReservation(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const id = Number(formData.get("id"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(id))
    throw new Error("You are not allowed to update this reservation");

  // const numGuests = Number(formData.get("numGuests"));
  // const observations = formData.get("observations").slice(0, 1000);
  // 3) converting inpurt data in format which is required for database
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  console.log(updatedFields);

  // 4) Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();
  // 5) error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // 6)revalidate
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${id}`);
  // 7) redirecting
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id); //this is we do for only allowing user to delete there own bookings not other user which can be done by delete there own boooking then going to network tab and copying curl command and running curl command with different  booking Id therefore this  verification is important

  //  to check useOptimistic
  // await new Promise((res) => setTimeout(res, 3000));
  // throw new Error();

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
