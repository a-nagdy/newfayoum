import { NextResponse } from "next/server";
import { listCategories, syncCategories } from "@/lib/db/categories";
import { errorResponse, jsonResponse } from "@/lib/content/api-utils";
import type { ProductCategory } from "@/lib/api/types";

export async function GET() {
  return jsonResponse(await listCategories());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as ProductCategory[];
    if (!Array.isArray(body)) {
      return errorResponse("Expected an array of categories");
    }

    const data = await syncCategories(body);
    return jsonResponse(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save categories";
    return errorResponse(message, 500);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 405 });
}
