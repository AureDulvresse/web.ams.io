import * as z from "zod";


export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  first_name: z.string({ required_error: "First name is required" }).min(
    2,
    "Frist name is required"
  ),
  last_name: z.string({ required_error: "Last name is required" }).min(
    2,
    "Last name is required"
  ),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirm_password: z.string({
    required_error: "Confirm password is required",
  }).min(1, "Confirm password is required"),
  roleId: z.number({ required_error: "Role is required" }).min(
    1,
    "Role is required"
  ),
});


export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
