import { NextResponse } from "next/server";
import { listProducts, syncProducts } from "@/lib/db/products";
import { errorResponse, jsonResponse } from "@/lib/content/api-utils";
import type { Product } from "@/lib/api/types";

export async function GET() {
  return jsonResponse(await listProducts());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Product[];
    if (!Array.isArray(body)) {
      return errorResponse("Expected an array of products");
    }

    const data = await syncProducts(body);
    return jsonResponse(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save products";
    return errorResponse(message, 500);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 405 });
}
