/**
 * Recursively sanitizes an object by converting all BigInt values to strings
 * and Date objects to ISO strings.
 * This is useful for safely serializing data (e.g., sending JSON responses)
 * since JSON does not support BigInt or Date objects directly.
 */
export function sanitizeBigInt(obj) {
  // If it's an array, sanitize each item recursively
  if (Array.isArray(obj)) {
    return obj.map(sanitizeBigInt);
  }

  // If it's a BigInt, convert it to string
  if (typeof obj === "bigint") {
    return obj.toString();
  }

  // If it's a Date, convert to ISO string
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  // If it's an object (but not null), sanitize each key-value pair
  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = sanitizeBigInt(value); // Recursively sanitize nested values
      return acc;
    }, {});
  }

  // For all other types (number, string, boolean, null, etc.), return as-is
  return obj;
}
