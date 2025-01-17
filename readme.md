// ...existing code...
# API Documentation

## Register User

**Endpoint:** `/register`  
**Method:** POST

**Description:**  
Registers a new user with the provided details.

**Payload:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "admin" | "customer"
}
Responses:

201 Created

{
    "message": "User registered successfully!"
}

400 Bad Request
{
    "message": "Registration failed!",
    "error": "error details"
}

Login User
Endpoint: /login
Method: POST

Description:
Authenticates a user and returns a JWT token upon successful login.

Payload:
{
    "email": "string",
    "password": "string"
}
Responses:

200 OK
{
    "token": "jwt_token_here"
}

400 Bad Request
{
    "message": "Invalid credentials!"
}

500 Internal Server Error

{
    "message": "Login failed!",
    "error": "error details"
}

Admin Access
Endpoint: /admin
Method: GET

Description:
Accesses admin-specific resources. This route is protected and requires the user to have an admin role.

Headers:

Authorization: Bearer <token>
Responses:
200 OK

{
    "message": "Welcome, Admin!"
}
401 Unauthorized

{
    "message": "Authentication token is missing or invalid."
}

403 Forbidden
{
    "message": "You do not have the necessary permissions."
}


## Accounts

### Create Account

**Endpoint:** `/accounts`  
**Method:** POST

**Description:**  
Creates a new account with the provided details.

**Payload:**
```json
{
    "name": "string",
    "phoneNumber": "number",
    "CNIC": "number",
    "address": "string",
    "accountNumber": "string",     // optional
    "accountBalance": "number"     // optional
}

Responses:

201 Created
{
    "name": "string",
    "phoneNumber": "number",
    "CNIC": "number",
    "address": "string",
    "accountNumber": "string",
    "accountBalance": "number",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "_id": "objectId"
}

400 Bad Request
{
    "message": "Failed to create account",
    "error": "error details"
}

Get All Accounts
Endpoint: /accounts
Method: GET

Description:
Retrieves a list of all accounts.

Responses:

200 OK

[
    {
        "name": "string",
        "phoneNumber": "number",
        "CNIC": "number",
        "address": "string",
        "accountNumber": "string",
        "accountBalance": "number",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "_id": "objectId"
    },
    ...
]

500 Internal Server Error
{
    "message": "Failed to fetch accounts",
    "error": "error details"
}


Get Account by ID
Endpoint: /accounts/:id
Method: GET

Description:
Retrieves an account by its ID.

Responses:

200 OK
{
    "name": "string",
    "phoneNumber": "number",
    "CNIC": "number",
    "address": "string",
    "accountNumber": "string",
    "accountBalance": "number",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "_id": "objectId"
}

404 Not Found
{
    "message": "Account not found"
}
500 Internal Server Error
{
    "message": "Failed to fetch account",
    "error": "error details"
}

Update Account
Endpoint: /accounts/:id
Method: PUT

Description:
Updates an existing account by its ID.

Payload: (fields to update)
{
    "name": "string",          // optional
    "phoneNumber": "number",   // optional
    "CNIC": "number",          // optional
    "address": "string",       // optional
    "accountNumber": "string", // optional
    "accountBalance": "number" // optional
}

Responses:

200 OK

400 Bad Request

{
    "message": "Failed to update account",
    "error": "error details"
}

404 Not Found
{
    "message": "Account not found"
}

Delete Account
Endpoint: /accounts/:id
Method: DELETE

Description:
Deletes an account by its ID.

Responses:

200 OK
{
    "message": "Account deleted successfully"
}

404 Not Found

{
    "message": "Account not found"
}

500 Internal Server Error

{
    "message": "Failed to delete account",
    "error": "error details"
}

Transactions
Create Transaction
Endpoint: /transactions
Method: POST

Description:
Creates a new transaction.

Payload:
{
    "accountId": "string",
    "accountNumber": "string",     // optional
    "transactionDate": "ISODate",
    "transactionAmount": "number"
}

Responses:

201 Created

{
    "accountId": "objectId",
    "accountNumber": "string",
    "transactionDate": "timestamp",
    "transactionAmount": "number",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "_id": "objectId"
}

400 Bad Request
{
    "message": "Failed to create transaction",
    "error": "error details"
}

Get All Transactions
Endpoint: /transactions
Method: GET

Description:
Retrieves a list of all transactions, populated with account name and phone number.

Responses:

200 OK

[
    {
        "accountId": {
            "_id": "objectId",
            "name": "string",
            "phoneNumber": "number"
        },
        "accountNumber": "string",
        "transactionDate": "timestamp",
        "transactionAmount": "number",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "_id": "objectId"
    },
    ...
]

500 Internal Server Error

{
    "message": "Failed to fetch transactions",
    "error": "error details"
}

Get Transactions by Account ID
Endpoint: /transactions/account/:accountId
Method: GET

Description:
Retrieves transactions for a specific account by account ID.

Responses:

200 OK
[
    {
        "accountId": "objectId",
        "accountNumber": "string",
        "transactionDate": "timestamp",
        "transactionAmount": "number",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "_id": "objectId"
    },
    ...
]

500 Internal Server Error

{
    "message": "Failed to fetch transactions",
    "error": "error details"
}

Update Transaction
Endpoint: /transactions/:id
Method: PUT

Description:
Updates an existing transaction by its ID.

Payload: (fields to update)

{
    "accountId": "string",          // optional
    "accountNumber": "string",      // optional
    "transactionDate": "ISODate",   // optional
    "transactionAmount": "number"   // optional
}

Responses:

200 OK

{
    "accountId": "objectId",
    "accountNumber": "string",
    "transactionDate": "timestamp",
    "transactionAmount": "number",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "_id": "objectId"
}

400 Bad Request

{
    "message": "Failed to update transaction",
    "error": "error details"
}
404 Not Found
{
    "message": "Transaction not found"
}

Delete Transaction
Endpoint: /transactions/:id
Method: DELETE

Description:
Deletes a transaction by its ID.

Responses:

200 OK

{
    "message": "Transaction deleted successfully"
}

404 Not Found

{
    "message": "Transaction not found"
}

500 Internal Server Error

{
    "message": "Failed to delete transaction",
    "error": "error details"
}#   M e a n - B a c k e n d - p r o j e c t  
 "# Mean-Backend-project" 
"# Mean-Backend-project" 
"# Mean-Backend-project" 
"# Mean-Backend-project" 
