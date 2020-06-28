# ShareShop
An online network based shop api


## Basic Workflow for user registration 
- Step 1: User will register by providing there details
**Endpoint** :- */users/signup*
**Request** :- POST 
**Example**:- 
```json
{
    "name":"Shashank Sahu",
    "email":"shashankcs083@gmail.com",
    "username":"NoobCoder",
    "password":"admin1234",
    "mobileNo":"+916307717161"
}
```
**Response**:-  On successful account creation user data will be saved and a json response will be sended.

- Step 2:  Request to send otp to the user
**Endpoint**:- */otp/sendOTP/:mobileNo*
**Request **:- GET
**Example**:- /otp/sendOTP/+916307717161

- Step 3: Verify the otp 
**Endpoint**:- */otp/verifyOTP*
**Request **:- POST
**Example**:- 
```json
{
    "mobileNo":"+916307717161",
	"otp":"123456"
}
```
**Response**:- Appropriate JSON respond will be sended

- Step 4:- User Login
**Endpoint** :- */users/login*
**Request**:- POST
**Example**:-
```json
{
    "username":"NoobCoder",
    "password":"admin1234"
}
```
**Response**:- A JSON WEB TOKEN(JWT) will be genrated and returned

## Utility Endpoints for Developers

- **/otp/clear** :- To delete all otp in database
- **/users/clear** :- To delete all users
- **/users/:userId** :- Returns the details of the user with this ID 
- **/users **:- Returns the list of all registered users 
- **/otp** :- returns the list of all otp in database