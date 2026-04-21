import { z } from "zod";


export type Organization = {
  id: string;
  name: string;
  legal_name: string;
  email: string;
  phone: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  organization: Organization;
};

export type LoginData = {
  user: User;
  access_token: string;
};

export type RegisterData = {
  user: User;
};

export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export type RegisterResponse = ApiResponse<RegisterData>;
export type LoginResponse = ApiResponse<LoginData>;


export const registerSchema = z.object({
  orgDetails: z.object({
    name: z.string().min(2, "Organization name is required"),
    legalName: z.string().min(2, "Legal name is required"),
    contactInfo: z.object({
      email: z.string().email("Invalid organization email"),
      phone: z
        .string()
        .min(10, "Phone must be at least 10 digits")
        .regex(/^[0-9+]+$/, "Invalid phone number"),
    }),
  }),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Password must include uppercase, lowercase, and number"
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;