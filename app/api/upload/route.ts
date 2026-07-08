import { saveUploadedImage } from "@/lib/upload/save-image";
import { errorResponse, jsonResponse } from "@/lib/content/api-utils";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return errorResponse("No image file provided");
    }

    const url = await saveUploadedImage(file);
    return jsonResponse({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    return errorResponse(message, 400);
  }
}
