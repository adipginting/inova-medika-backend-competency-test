# Menjalankan program
Untuk menjalankan program, klon repository ini terlebih dahulu
```

git clone https://github.com/adipginting/inova-medika-backend-competency-test

```
Masuk ke dalam repository
```

cd inova-medika-backend-competency-test

```
Pasang package node
```

npm i

```
Pastikan mongodb sudah terpasang dan untuk melakukan seeding db dengan username (timInova) dan password default (1Team1Semangat1Tujuan), build program terlebih dahulu.
```

npm run build

```
Lalu, jalankan seeding.
```

npm run seed

```
Untuk menjalankan testing. Setelah program di-build, jalankan
```

npm run test

```
Ubah file dot-env menjadi .env agar isi 
```

mv dot-env .env

```
Untuk menjalankan program yang telah di-build, jalankan
```

npm run start

```
Untuk menjalankan mode development
```
npm run dev

```

# Daftar End Point, Contoh Payload, dan Luaran
## 1.  Mendapatkan Token (POST)

End point
```

POST {{baseUrl}}/getToken

```

Body Parameter

```
{
  "username": "timInova",
  "password": "1Team1Semangat1Tujuan"
}

```
Constoh Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbUlub3ZhIiwiaWF0IjoxNzQzODg2Mjc1LCJleHAiOjE3NDM4ODY4NzV9.BXOZHDT04uIju1u8hZWN7l1Z0qGnqoOGIy5Ka3rf87k"
}

```
## 2. Membuat user baru (POST)
Authentication: Bearer Token

End point
```

POST {{baseUrl}}/createUser

```

Body Parameter

```
{
  "username":"test",
  "name": "test",
  "email": "test@testnet.com",
  "gender": "male",
  "password": "pass",
  "status": "active"
}

```
Contoh Response
```
{
  "success": true,
  "message": "User was generated."
}

```

## 3. Update user (POST)
Authentication: Bearer Token

End point
```

POST {{baseUrl}}/updateUser

```

Body Parameter

```
{
  "name": "Test",
  "email": "test@testnet.com",
  "gender":"male",
  "status":"inactive"
}

```
Contoh Response
```
{
  "success": true,
  "message": "User was updated."
}

```

## 4. List Users (GET)
Authentication: Bearer Token

End point
```

GET {{baseUrl}}/listUser/10/1

```

Contoh Response
```
{
  "success": true,
  "message": "Users found.",
  "data": [
    {
      "id": "67f126fd0ae71934189a9e91",
      "name": "adi",
      "email": "adi@test.com",
      "status": "inactive",
      "username": "adi",
      "gender": "male"
    },
    {
      "id": "67f1a1d6b5b25d34f1a45f56",
      "name": "Test",
      "email": "test@testnet.com",
      "status": "inactive",
      "username": "test",
      "gender": "male"
    }
  ]
}

```

## 5. Detail User (GET)
Authentication: Bearer Token

End point
```

GET {{baseUrl}}/detailUser/67f1a1d6b5b25d34f1a45f56

```

Contoh Response
```
{
  "success": true,
  "message": "User found.",
  "data": {
    "id": "67f1a1d6b5b25d34f1a45f56",
    "name": "Test",
    "email": "test@testnet.com",
    "status": "inactive",
    "username": "test",
    "gender": "male"
  }
}

```

## 6. Delete User (Delete)
Authentication: Bearer Token

End point
```

DELETE {{baseUrl}}/deleteUser/67f1a1d6b5b25d34f1a45f56

```

Contoh Response
```
{
  "success": true,
  "message": "User deleted.",
  "data": {
    "id": "67f1a1d6b5b25d34f1a45f56",
    "name": "Test",
    "email": "test@testnet.com",
    "status": "inactive",
    "username": "test",
    "gender": "male"
  }
}

```









