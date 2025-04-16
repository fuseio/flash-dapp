import { PasskeyArgType, extractPasskeyData } from '@safe-global/protocol-kit'

import { USER } from './config'

/**
 * Create a passkey using WebAuthn API.
 * @returns {Promise<PasskeyArgType>} Passkey object with rawId and coordinates.
 * @throws {Error} If passkey creation fails.
 */
export async function createPasskey(username: string): Promise<PasskeyArgType> {
  // Generate a passkey credential using WebAuthn API
  const passkeyCredential = await navigator.credentials.create({
    publicKey: {
      pubKeyCredParams: [
        {
          // ECDSA w/ SHA-256: https://datatracker.ietf.org/doc/html/rfc8152#section-8.1
          alg: -7,
          type: 'public-key'
        }
      ],
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: {
        name: 'Safe SmartAccount'
      },
      user: {
        displayName: username,
        id: crypto.getRandomValues(new Uint8Array(32)),
        name: username
      },
      timeout: 60_000,
      attestation: 'none'
    }
  })

  if (!passkeyCredential) {
    throw Error('Passkey creation failed: No credential was returned.')
  }

  const passkey = await extractPasskeyData(passkeyCredential)
  return passkey
}

/**
 * Store passkey in local storage.
 * @param {PasskeyArgType} passkey - Passkey object with rawId and coordinates.
 */
export function storePasskey(passkey: PasskeyArgType) {
  const passkeys = loadPasskeys()

  passkeys.push(passkey)

  localStorage.setItem(USER.passkeyStorageKey, JSON.stringify(passkeys))
}

/**
 * Load passkeys from local storage.
 * @returns {PasskeyArgType[]} List of passkeys.
 */
export function loadPasskeys(): PasskeyArgType[] {
  const passkeysStored = localStorage.getItem(USER.passkeyStorageKey)

  const passkeyIds = passkeysStored ? JSON.parse(passkeysStored) : []

  return passkeyIds
}

/**
 * Get passkey object from local storage.
 * @param {string} passkeyRawId - Raw ID of the passkey.
 * @returns {PasskeyArgType} Passkey object.
 */
export function getPasskeyFromRawId(passkeyRawId: string): PasskeyArgType {
  const passkeys = loadPasskeys()

  const passkey = passkeys.find((passkey) => passkey.rawId === passkeyRawId)!

  return passkey
}
