# TeamA - Backend

## Overview

This is the ReadMe instruction for the Team A Backend.

---

## Setup Instructions

#### Backend setupt

1. Especially there is internal folder for the charitan project.
   ```bash
   cd Backend
   ```
2. Create a .env file and add the necessary environment variables.

```
# Team A config
MONGO_URI=mongodb+srv://teamamembers:teamamembers@teamadb.4t1sy.mongodb.net/?retryWrites=true&w=majority&appName=teamAdb
TEST_MONGO_URI=mongodb+srv://teamamembers:teamamembers@teamadb.4t1sy.mongodb.net/test?retryWrites=true&w=majority&appName=teamAdb
PORT=4000
HOST=localhost
EXTERNAL_HOST = <IPV4>
TEAM_A_BASE_URL=http://localhost:4000
TEAM_A_BASE_URL_FRONTEND=http://localhost:3000
INTERNAL_API_KEY=291zhI0AhUzU99YJ3CrkqatoPtb_8tY42VpD4y9CcuHNsizecGlQZylwoicQhiYSUHczM93Zk-mJl_yyI17RlQ
# MAILERSEND_API_KEY=mlsn.5ef83003d015013df56da214d955735af0a56f53f010b1ff816f7b27df281694
MAILERSEND_API_KEY=mlsn.af4181012a0d027f3bfbc845bdafe397cc4c2bf8ef582905b6554a3c5e4a3773
EMAIL_FROM = MS_zaycZ6@trial-0p7kx4xy7p8l9yjr.mlsender.net
EMAIL_FROM_NAME = "Charitan Donation Platform"


# PayPal Configuration (for payment processing)
PAYPAL_CLIENT_ID=AaIA1lYfaMLaeaACBP6M9N1YHUIDGQ16TzlCsNU6cN4uC2KaTEwyqzfPrzXhvIw6ntKzJmbjIlp-SD97
PAYPAL_CLIENT_SECRET=EHm7GO9RycrdMIaX9IcOTPn22VvPcT8M2xhu40tugo_PyXm9KsFVG58DIcIcwRr7S-YMJ2XWKQpUPdx5
PAYPAL_API_URL=https://api-m.sandbox.paypal.com


# API GateWay (for payment processing, and project service change to your local ip address)
API_GATEWAY_URL=<API_GATE_lINK>
TEAM_B_API=<API_GATE_lINK>/admin-server
INTERNAL_API_GATEWAY=<API_GATE_lINK>/internal

# Cloudinary API
CLOUD_NAME=danbr3geg
CLOUD_API_KEY=211595652441243
CLOUD_API_SECRET=Y76JJFWNJXVchVO7uasl66PlavM

# Redis Instance
REDIS_HOST=0.0.0.0
REDIS_PORT=6379
REDIS_PASS=teamAredis
```

3. Install packages and dependencies
   ```bash
   npm install
   ```
4. Start the web app
   ```bash
   npm start
   ```
5. The server is running at port:4000
