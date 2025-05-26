import { reactive, type Ref, toRefs } from "vue";
import type { Validator } from "@/composables/validators";

type ErrorRecord<Form> = Partial<Record<keyof Form, string | null>>;

export function useFormValidation<Form extends Record<string, any>>(
  formData: Form,
  validationSchema: Partial<Record<keyof Form, Validator[]>>
) {
  // Initialize reactive errors object
  const errors = reactive({} as ErrorRecord<Form>);

  // Validate a single field
  function validateField(field: keyof Form): boolean {
    // Clear existing error
    (errors as any)[field] = null;

    const rules = validationSchema[field] || [];
    for (const rule of rules) {
      const errorMsg = rule(formData[field]);
      if (errorMsg) {
        (errors as any)[field] = errorMsg;
        return false;
      }
    }
    return true;
  }

  // Validate all fields in schema
  function validate(): boolean {
    let isValid = true;
    (Object.keys(validationSchema) as (keyof Form)[]).forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  function resetValidation(): void {
    (Object.keys(errors) as (keyof Form)[]).forEach((field) => {
      (errors as any)[field] = null;
    });
  }

  return {
    ...(toRefs(errors) as { [K in keyof Form]: Ref<string | null> }),
    errors,
    validateField,
    validate,
    resetValidation,
  };
}
