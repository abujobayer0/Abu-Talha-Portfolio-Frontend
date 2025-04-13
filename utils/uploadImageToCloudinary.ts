// utils/cloudinary.ts

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", `${upload_preset}`);
  formData.append("cloud_name", "Portfolio");

  const response = await fetch(`${cloudinary_url}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data.secure_url;
};
