export type Validator = (value: unknown) => string | null;

export const required =
  (message = "This field is required"): Validator =>
  (value) =>
    value != null && value !== "" ? null : message;

export const minLength =
  (min: number, message?: string): Validator =>
  (value) => {
    const str = String(value ?? "");
    return str.length >= min
      ? null
      : message || `Minimum length is ${min} characters`;
  };

export const maxLength =
  (max: number, message?: string): Validator =>
  (value) => {
    const str = String(value ?? "");
    return str.length <= max
      ? null
      : message || `Must be at most ${max} characters`;
  };

export const email =
  (message = "Invalid email format."): Validator =>
  (value) =>
    typeof value === "string" && value.includes("@") ? null : message;

export const pattern =
  (regex: RegExp, message = "Invalid Format."): Validator =>
  (value) =>
    typeof value === "string" && regex.test(value) ? null : message;

export const numeric =
  (message = "Must be a number."): Validator =>
  (value) =>
    !isNaN(Number(value)) ? null : message;

export const minValue =
  (min: number, message?: string): Validator =>
  (value) => {
    const num = Number(value);
    return !isNaN(num) && num >= min
      ? null
      : message || `Must be at least ${min}.`;
  };

export const maxValue =
  (max: number, message?: string): Validator =>
  (value) => {
    const num = Number(value);
    return !isNaN(num) && num <= max
      ? null
      : message || `Must be at most ${max}.`;
  };

export const sameAs =
  (compareFn: () => unknown, message = "Values do not match."): Validator =>
  (value) =>
    value === compareFn() ? null : message;
