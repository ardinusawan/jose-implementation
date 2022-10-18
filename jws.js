const jose = require('jose')
const crypto = require('crypto')

async function getPrivateKey() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  console.log("public key", publicKey.export({format:'pem',type:'spki'}))
  console.log("private key", privateKey.export({format:'pem',type:'pkcs8'}))
  return privateKey
}

async function signJWT(privateKey, payload) {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'EdDSA' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(privateKey)
  return jwt;
}

(async() => {
  let privateKey = await getPrivateKey()

  payload = {
	  "foo": "bar"
  }
  jws = await signJWT(privateKey, payload);
  console.log("jws", jws);

  try {
      // verify token
      const { payload, protectedHeader } = await jose.jwtVerify(jws, privateKey);
      // log values to console
      console.log("\nresult:");
      console.log("protectedHeader", protectedHeader);
      console.log("payload", payload);
    } catch (e) {
      // token verification failed
      console.log("Token is invalid");
    }
})();
