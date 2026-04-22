import { RegisterInput, LoginResponse, LoginFormInputs } from "@/types/auth";

const REGISTER_API_URL = process.env.NEXT_PUBLIC_REGISTER_API_URL;

if (!REGISTER_API_URL) {
  throw new Error("REGISTER_API_URL is not defined in environment variables");
}

const LOGIN_API_URL = process.env.NEXT_PUBLIC_LOGIN_API_URL;

if (!LOGIN_API_URL) {
  throw new Error("LOGIN_API_URL is not defined in environment variables");
}

const USER_DETAILS_API_URL = process.env.NEXT_PUBLIC_USER_DETAILS_API_URL;

if (!USER_DETAILS_API_URL) {
  throw new Error(
    "USER_DETAILS_API_URL is not defined in environment variables",
  );
}

//register user
export const registerUser = async (data: RegisterInput): Promise<void> => {
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Registration failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error(error instanceof Error ? error.message : "An error occurred during registration");
  }
};

//login user
export const loginUser = async (
  data: LoginFormInputs,
): Promise<LoginResponse> => {
  console.log(data);
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error instanceof Error ? error.message : "An error occurred during login");
     
    
  }
};

export const getUserDetails = async (accessToken: string) => {
  try {
    const response = await fetch(USER_DETAILS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch user details");
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("An error occurred while fetching user details");
  }
};
