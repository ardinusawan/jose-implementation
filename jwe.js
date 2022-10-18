const jose = require('jose')

async function getJWK() {
  // generate secret
  // const secretGenerated = await jose.generateSecret('A128GCM')
  // const secret = await jose.exportJWK(secretGenerated)
  // console.log("secret ", secretGenerated.export({format:'jwk'}))

  // bring ur own JWK secret
  const secret = { kty: 'oct', k: 'cJRCTtsXeCmGPtFFk9WJyA' }
  const jwk = await jose.importJWK(
    secret,
    'A128GCM',
  )
  return jwk
}

async function encryptJWT(jwk, payload) {
  const jwe = await new jose.EncryptJWT(payload)
  .setProtectedHeader({ alg: 'dir', enc: 'A128GCM' })
  .setIssuedAt()
  .setExpirationTime('12h')
  .encrypt(jwk)
  return jwe;
}

async function decryptJWT(jwk, jwe) {
  const { plaintext, protectedHeader } = await jose.compactDecrypt(jwe, jwk)
  // console.log("protectedHeader", protectedHeader)

  return new TextDecoder().decode(plaintext);
}



(async() => {
  let jwk = await getJWK();
  content = { 'foo': 'bar'}
  console.log('original content', content);

  let jwe = await encryptJWT(jwk, content);
  console.log(`\njwe: ${jwe}`);

  let decryptedContent = await decryptJWT(jwk, jwe);
  console.log(`\ndecrypted content: ${decryptedContent}`);
})();
