import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not load the cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //We need always different name for image.
  //if we not remove the  '/' then in supabase 1 new floder will be created for every slash
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //Create cabin
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  console.log(query);

  const { data, error } = await query.select().single();
  // select is important if we want to work with response of this operation if we do not pass this then sometime our response will be empty object. single is used to take response out of the array because response is send inside a array

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //uploading Image IMP
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
