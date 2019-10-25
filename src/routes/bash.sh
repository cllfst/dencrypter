cd keys
key="privateKey"
pub="publicKey"
`openssl genrsa -out $key 2048 1>/dev/null`
`openssl rsa -in $key -pubout -out $pub 1>/dev/null`
cd ..