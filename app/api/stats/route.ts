import { createSectionHandlers } from "@/lib/content/create-section-handlers";

const handlers = createSectionHandlers("stats");
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const OPTIONS = handlers.OPTIONS;
