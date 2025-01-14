import { compactDecrypt, importPKCS8 } from 'jose';

// The private key (replace with your actual private key)
const privateKeyPem = `-----BEGIN PRIVATE KEY-----
YOUR_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----`;

// Function to import the private key
async function importPrivateKey() {
  return await importPKCS8(privateKeyPem, 'RSA-OAEP');
}

// Function to decrypt a JWE
async function decryptJWE(jwe) {
  try {
    // Import the private key
    const privateKey = await importPrivateKey();

    // Decrypt the JWE
    const { plaintext } = await compactDecrypt(jwe, privateKey);

    // Decode plaintext to string
    const decoded = new TextDecoder().decode(plaintext);
    console.log('Decrypted JWE:', decoded);

    return decoded;
  } catch (error) {
    console.error('Failed to decrypt JWE:', error.message);
    throw new Error('Decryption failed');
  }
}

// Example usage
(async () => {
  const jweToken = 'YOUR_JWE_TOKEN_HERE';
  const decryptedData = await decryptJWE(jweToken);
  console.log('Decrypted Data:', decryptedData);
})();
