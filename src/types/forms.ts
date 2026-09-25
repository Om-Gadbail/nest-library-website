/**
 * Nest Library — form-related shared types.
 */

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormState<TData> {
  status: FormStatus;
  data: TData | null;
  serverMessage: string | null;
}
