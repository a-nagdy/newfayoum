import { NextResponse } from "next/server";
import { listProducts, syncProducts } from "@/lib/db/products";
import { errorResponse, jsonResponse } from "@/lib/content/api-utils";
import { friendlyDbError, validateProducts } from "@/lib/admin/validation";
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

    const validation = validateProducts(body);
    if (!validation.ok) {
      return errorResponse(validation.message);
    }

    const data = await syncProducts(body);
    return jsonResponse(data);
  } catch (error) {
    const raw =
      error instanceof Error ? error.message : "Failed to save products";
    const message = friendlyDbError(raw);
    const status = raw.includes("out of range for type integer") ? 400 : 500;
    return errorResponse(message, status);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 405 });
}
