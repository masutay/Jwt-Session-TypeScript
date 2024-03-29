# AUTHENTICATION WITH JWT-SESSION

##Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Connect to Database

1. Add your database information in to ormconfig.json as you see below

```json
{ 
   "type": "mysql",
   "host": "Your host name-exam:localhost or local Ip address ",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test"
}
```

2. Add secret key and port info  to env information in to .env file as you see below

```env

   ACCESS_TOKEN_SECRET=

   SESSION_SECRET=

   PORT = example: 5000

```

 #  :memo: Description

This project has 3 pages these are register, login and dashboard. The user is directed to login after registration.When user loggin a session and token are created saved to DB using typeormStore module.The session is including browser information ,userID and token.Token added under the cookies as a cookie but you can save to local storage too.After user logout, session and token are destroyed from db and browser but If the user just closes the browser window, user can access the user dashboard without logging in until the token expires through the same browser.

**We use session and token but what are they exactly ? Lets look over together!** 

## Session

A session is a small file, most likely in JSON format, that stores information about the user, such as a unique ID, time of login and expirations, and so on. It is generated and stored on the server so that the server can keep track of the user requests. The user receives some of these details, especially the ID, as cookies that will be sent with every new request, so that the server can recognize the ID and authorize the user’s requests.

### How Works Session

1. The user sends a login request to the server.
2. The server authenticates the login request, sends a session to the database, and returns a cookie containing the session ID to the user.
3. The server checks in the database for the ID found in the cookie, if the ID is found it sends the requested pages to the user.
4. Now, the user sends new requests (with a cookie).

![session-authentication](https://user-images.githubusercontent.com/59343235/150685967-17b0dd25-7868-43bc-b8d1-e0bbd23c8372.png)

## Token

It is generated by the server using a secret key, sent to and stored by the user in their local storage. Like in the case of cookies, the user sends this token to the server with every new request, so that the server can verify its signature and authorize the requests. 

### How Works Token
1. The user sends a login request to the server.
2. The server authorizes the login and sends a token to the user.
3. The server checks the token is valid or not, if the token is valid it sends the requested pages to the user.
4. Now, the user sends a new request(with a token).


![token-authentication](https://user-images.githubusercontent.com/59343235/150686028-8adf865d-0616-4cda-93d0-7c40b13da09a.png)


# :computer: Technologies

* **HTML**
* **CSS**
* **Bootstrap**
* **JavaScript**
* **NodeJS**
* **Express.js**
* **MySQL**
* **TypeORM**


# :video_camera:  Video

https://user-images.githubusercontent.com/59343235/150685731-750d2f00-2fd8-4f2e-bb14-77766834e46c.mp4

# :camera:  Screenshots

## Register Page 

![Screenshot_1](https://user-images.githubusercontent.com/59343235/149677459-6717e196-be0f-4e04-9579-486c14f9d467.png)

## Login Page
 
![Screenshot_2](https://user-images.githubusercontent.com/59343235/149677547-841b3051-ea70-4bdd-87a4-b1a4144a7ec5.png)

## Dashboar Page
![Screenshot_3](https://user-images.githubusercontent.com/59343235/149677567-da6ba836-bd79-4db0-a8c8-ba0424fa5c45.png)

