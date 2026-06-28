import { NextResponse } from "next/server";
import type { ContentKey } from "@/lib/api/types";
import { getSection, updateSection } from "./store";
import { errorResponse, jsonResponse } from "./api-utils";

export function createSectionHandlers<K extends ContentKey>(key: K) {
  return {
    async GET() {
      const data = await getSection(key);
      return jsonResponse(data);
    },
    async PUT(request: Request) {
      try {
        const body = await request.json();
        const data = await updateSection(key, body);
        return jsonResponse(data);
      } catch {
        return errorResponse("Invalid JSON body");
      }
    },
    OPTIONS() {
      return new NextResponse(null, { status: 405 });
    },
  };
}
