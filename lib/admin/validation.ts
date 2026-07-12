import type { Product } from "@/lib/api/types";

/** PostgreSQL / Supabase integer column limit */
export const MAX_DB_INT = 2_147_483_647;

export type ValidationResult = { ok: true } | { ok: false; message: string };

function itemLabel(product: Product, index: number) {
  return product.title.en || product.title.ar || `Property #${index + 1}`;
}

function checkInt(
  label: string,
  value: number | undefined | null,
  options?: { required?: boolean; min?: number; max?: number },
): string | null {
  if (value == null || Number.isNaN(value)) {
    return options?.required ? `${label} is required` : null;
  }

  if (!Number.isInteger(value)) {
    return `${label} must be a whole number`;
  }

  const min = options?.min ?? 0;
  const max = options?.max ?? MAX_DB_INT;

  if (value < min) {
    return `${label} must be at least ${min.toLocaleString()}`;
  }

  if (value > max) {
    return `${label} is too large (max ${max.toLocaleString()})`;
  }

  return null;
}

export function validateProduct(product: Product, index = 0): ValidationResult {
  const name = itemLabel(product, index);

  if (!product.title.ar?.trim() && !product.title.en?.trim()) {
    return { ok: false, message: `${name}: title is required (Arabic or English)` };
  }

  if (!product.slug?.trim()) {
    return { ok: false, message: `${name}: slug is required` };
  }

  if (!product.categorySlug?.trim()) {
    return { ok: false, message: `${name}: category is required` };
  }

  const checks = [
    checkInt("Price", product.price, { required: true, min: 0 }),
    checkInt("Bedrooms", product.bedrooms, { min: 0, max: 50 }),
    checkInt("Bathrooms", product.bathrooms, { min: 0, max: 50 }),
    checkInt("Area (sqm)", product.area, { min: 0, max: 1_000_000 }),
    checkInt("Expected return %", product.expectedReturn, { min: 0, max: 100 }),
    checkInt("Monthly installment", product.monthlyInstallment, { min: 0 }),
    checkInt("Funded %", product.fundedPercent, { min: 0, max: 100 }),
  ];

  for (const err of checks) {
    if (err) return { ok: false, message: `${name}: ${err}` };
  }

  return { ok: true };
}

export function validateProducts(products: Product[]): ValidationResult {
  if (!Array.isArray(products) || products.length === 0) {
    return { ok: false, message: "Add at least one property before saving" };
  }

  for (let i = 0; i < products.length; i++) {
    const result = validateProduct(products[i], i);
    if (!result.ok) return result;
  }

  return { ok: true };
}

export function friendlyDbError(message: string): string {
  if (message.includes("out of range for type integer")) {
    return "A number is too large. Maximum allowed is 2,147,483,647.";
  }
  if (message.includes("duplicate key") && message.includes("slug")) {
    return "Another property already uses this slug.";
  }
  return message;
}
