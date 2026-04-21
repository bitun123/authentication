import { z } from "zod";

export type Organization = {
  id: string;
  name: string;
  legal_name: string;
  email: string;
  phone: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  organization?: Organization;
};

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface userDetailsData {
  mfa: {
    totpEnabled: boolean;
    totpVerified: boolean;
    passkeyEnabled: boolean;
    backupCodes: string[];
    passkeys: any[];
  };
  _id: string;
  name: string;
  email: string;
  orgId: {
    _id: string;
    name: string;
    orgId: string;
  };
  role: string;
  enabled: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ApiResponse<T> = {
  error: boolean;
  status: number;
  message: string;
  code: string;
  accessToken?: string;
  data: T;
  expiryAt: string;
};

export type LoginResponse = ApiResponse<User>;

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
      "Password must include uppercase, lowercase, and number",
    ),
});

export type userDetailsResponse = ApiResponse<userDetailsData>;

export type RegisterInput = z.infer<typeof registerSchema>;
