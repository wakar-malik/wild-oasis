import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // image-url
  // https://gfqjtaxntksyooopezgm.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // Create/Edit Cabin query
  let query = supabase.from("cabins");

  // Create Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }

  // Edit Cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  // executing query
  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Could not create cabin");
  }

  if (hasImagePath) return data;

  // Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.log(storageError);
    throw new Error("Could upload image");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted!");
  }

  return data;
}
