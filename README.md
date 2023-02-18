## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Reset password
In this function, I use nodemailer + cache manager to handle.

When the user sends a valid email, the server will send an OTP code used to confirm. OTP code will be random and is valid for 5 minutes. If exceed 5 minutes, it will be removed.

In handling, I use nodemailer to send mail and auth by gmail of google.

I use cache manager to store key-value (email-otpcode). It will expire in 5 minutes. When I use it to check a valid OTP.
```bash
URL: auth/forget-password -> auth/forget-password/confirm -> auth/forget-password/reset
# auth/forget-password
$ body: email
# auth/forget-password/confirm
$ body: email, OTP
# auth/forget-password/reset
$ body: email, password, confirmPassword
```

## Create Exam
Lib: xlsx, multer

xlsx to read file excel imported by the user to get an array object including email, fullname. 

multer to upload file

