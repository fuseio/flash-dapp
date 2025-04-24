import { AuthenticationResponseJSON } from "@simplewebauthn/browser";
import { NEXT_PUBLIC_FLASH_API_BASE_URL } from "./config";
import { RegistrationResponse, User } from "./types";

export const refreshToken = () => {
  return fetch(`${NEXT_PUBLIC_FLASH_API_BASE_URL}/accounts/v1/auths/refresh-token`, {
    method: 'POST',
    credentials: 'include'
  })
}

// use fetch because some browser doesn't support fetch wrappers such as axios
// see: https://simplewebauthn.dev/docs/advanced/browser-quirks#safari
export const generateRegistrationOptions = async (username: string) => {
  const response = await fetch(`${NEXT_PUBLIC_FLASH_API_BASE_URL}/accounts/v1/passkeys/registration/generate-options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username }),
  });
  
  if (!response.ok) throw response;
  return response.json();
};

export const verifyRegistration = async (registrationResponse: RegistrationResponse): Promise<User> => {
  const response = await fetch(`${NEXT_PUBLIC_FLASH_API_BASE_URL}/accounts/v1/passkeys/registration/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(registrationResponse),
  });
  if (!response.ok) throw response;
  return response.json();
};

export const generateAuthenticationOptions = async () => {
  const response = await fetch(`${NEXT_PUBLIC_FLASH_API_BASE_URL}/accounts/v1/passkeys/authentication/generate-options`, {
    credentials: 'include'
  });
  if (!response.ok) throw response;
  return response.json();
};

export const verifyAuthentication = async (authenticationResponse: AuthenticationResponseJSON): Promise<User> => {
  const response = await fetch(`${NEXT_PUBLIC_FLASH_API_BASE_URL}/accounts/v1/passkeys/authentication/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(authenticationResponse),
  });
  if (!response.ok) throw response;
  return response.json();
};
