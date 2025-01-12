// The RSA public key (replace with your actual public key)
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
YOUR_PUBLIC_KEY_HERE
-----END PUBLIC KEY-----`;

// Function to import the public key
async function importPublicKey() {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(publicKeyPem);

  return await crypto.subtle.importKey(
    'spki', // Public key format
    keyData.buffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false, // Non-extractable
    ['encrypt']
  );
}

// Function to encrypt the password
async function encryptPassword(password) {
  try {
    const publicKey = await importPublicKey();

    // Encode the password into bytes
    const encodedPassword = new TextEncoder().encode(password);

    // Encrypt the password
    const encryptedPassword = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      encodedPassword
    );

    // Convert encrypted data to base64
    const base64EncryptedPassword = btoa(
      String.fromCharCode(...new Uint8Array(encryptedPassword))
    );

    console.log('Encrypted Password:', base64EncryptedPassword);

    return base64EncryptedPassword;
  } catch (error) {
    console.error('Failed to encrypt password:', error.message);
    throw new Error('Encryption failed');
  }
}

// Example usage
(async () => {
  const password = 'securePassword123';
  const encryptedPassword = await encryptPassword(password);
  console.log('Encrypted Password:', encryptedPassword);
})();
