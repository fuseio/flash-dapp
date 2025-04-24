// Safe extractPasskeyData require getPublicKey,
// however SimpleWebAuthn serialize the data to send over JSON request,
// so startRegistration doesn't have getPublicKey function,
// see: https://github.com/safe-global/safe-core-sdk/blob/0b3378478e88d9303d04f314a477228b0cbe221f/packages/protocol-kit/src/utils/passkeys/extractPasskeyData.ts
import { PasskeyArgType, PasskeyCoordinates } from "@safe-global/protocol-kit"

interface PasskeyAuthenticatorResponse extends AuthenticatorResponse {
  publicKey: string;
}

export async function decodePublicKeyForWeb(publicKey: string | ArrayBuffer): Promise<PasskeyCoordinates> {
  const algorithm = {
    name: 'ECDSA',
    namedCurve: 'P-256',
    hash: { name: 'SHA-256' }
  }

  const keyBuffer = typeof publicKey === 'string' 
    ? Buffer.from(publicKey, 'base64')
    : publicKey

  const key = await crypto.subtle.importKey('spki', keyBuffer, algorithm, true, ['verify'])

  const { x, y } = await crypto.subtle.exportKey('jwk', key)

  const isValidCoordinates = !!x && !!y

  if (!isValidCoordinates) {
    throw new Error('Failed to generate passkey Coordinates. crypto.subtle.exportKey() failed')
  }

  return {
    x: '0x' + Buffer.from(x, 'base64').toString('hex'),
    y: '0x' + Buffer.from(y, 'base64').toString('hex')
  }
}

export async function extractPasskeyData(passkeyCredential: Credential): Promise<PasskeyArgType> {
  const passkeyPublicKeyCredential = passkeyCredential as PublicKeyCredential
  const passkeyPublicKeyCredentialReponse = passkeyPublicKeyCredential.response as PasskeyAuthenticatorResponse

  const rawId = Buffer.from(passkeyPublicKeyCredential.rawId).toString('hex')
  const coordinates = await decodePublicKeyForWeb(passkeyPublicKeyCredentialReponse.publicKey)

  return {
    rawId,
    coordinates
  }
}
