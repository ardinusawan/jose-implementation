# JWS & JWT using JOSE
Implementation of library [panva/jose](https://github.com/panva/jose)

## How
1. npm i jose

## JWE using alg `dir` and `A128GCM` enc
```
node jwe.js
```

## JWS using alg `EdDSA` and `ed25519` enc
```
node jws.js
```

## Docs
- [Algorithm required](https://github.com/panva/jose/issues/210)
- [Direct JSON Web Encryption (JWE) with a shared symmetric key](https://connect2id.com/products/nimbus-jose-jwt/examples/jwe-with-shared-key)
- [Distinguishing between JWS and JWE Objects](https://www.rfc-editor.org/rfc/rfc7516#section-9)
