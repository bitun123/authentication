import {
  RegisterInput,
  RegisterResponse,
  LoginResponse,
} from "../../../types/auth";

const REGISTER_API_URL = process.env.NEXT_PUBLIC_REGISTER_API_URL;

if (!REGISTER_API_URL) {
  throw new Error("REGISTER_API_URL is not defined in environment variables");
}

const LOGIN_API_URL = process.env.NEXT_PUBLIC_LOGIN_API_URL;

if (!LOGIN_API_URL) {
  throw new Error("LOGIN_API_URL is not defined in environment variables");
}

//register user
export const registerUser = async (
  data: RegisterInput,
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData: RegisterResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Registration failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("An error occurred during registration");
  }
};

//login user
export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("An error occurred during login");
  }
};
