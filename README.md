
# MERN App With Kerberos Auth Example

## Kerberos or Cerberus in Greek Methology :

In Greek mythology, Cerberus (/ˈsɜːrbərəs/;[2] Greek: Κέρβερος Kérberos [ˈkerberos]), often referred to as the hound of Hades, is a multi-headed dog that guards the gates of the Underworld to prevent the dead from leaving. He was the offspring of the monsters Echidna and Typhon, and was usually described as having three heads, a serpent for a tail, and snakes protruding from multiple parts of his body. Cerberus is primarily known for his capture by Heracles, the last of Heracles' twelve labours.

![artworks-alOkhAoOQIC0hBtb-yyYYpw-t500x500](https://user-images.githubusercontent.com/71633887/229261421-2784ed59-ee70-40ee-ba25-d4d8e50ce6b2.jpg)

## Introduction

### What is Kerberos Auth ?

- Kerberos (/ˈkɜːrbərɒs/) is a computer-network authentication protocol that works on the basis of tickets to allow nodes communicating over a non-secure network to prove their identity to one another in a secure manner. Its designers aimed it primarily at a client–server model, and it provides mutual authentication—both the user and the server verify each other's identity. Kerberos protocol messages are protected against eavesdropping and replay attacks.
Kerberos builds on symmetric-key cryptography and requires a trusted third party, and optionally may use public-key cryptography during certain phases of authentication. Kerberos uses UDP port 88 by default.
The protocol was named after the character Kerberos (or Cerberus) from Greek mythology, the ferocious three-headed guard dog of Hades.
 
 ![0_Qeh4qhAIiY1zxjCR](https://user-images.githubusercontent.com/71633887/229261451-aa2bcb83-3b26-49a3-9ddb-382da5ab4b3b.gif)

##  Kerberos Protocol Overview 

Kerberos authentication protocol takes care of both of these tasks. It is designed for security and authentication designed by MIT not IIT mind you.


Suppose a client wants to access a file server, with Kerberos he would have to be verified by a third-party called KEY DISTRIBUTION CENTER (KDC) which has two servers 

- Authentication Server (AS)
- Ticket Granting Server (TGS)

![0_jtaY8zhL4KtvGOrI](https://user-images.githubusercontent.com/71633887/229261626-95512ac5-c9b3-4f72-a00c-fe9fb0edfcd9.png)

<h6 align="center" >Kerberos Protocol Overview </h6>

So, the steps that are involved in the process of the user connecting to the file server are as follows:

- The client sends a request stating that he needs access to the file server, to the AS providing the user id and the request is partially encrypted with by his password which he never sends over the unsecured network, but uses as an encryption key. The AS will try to look up the user id in the database and try to decrypt his request with the password as the key. And this sharing of the secret key (password) among the client and the AS is how the user gets verified. After this, the AS sends a TGT (Ticket Granting Ticket) which is encrypted with another secret key, back to the client.
- The client then sends the TGT to the TGS along with his request(“i want the access to the file server”). The TGS then decrypts the TGT with a secret key that the AS shares with the TGS. After this the TGS issues the client a token encrypted with another secret key (3rd one). This secret key is shared among the TGS and the file server. The client sends the token to the file server.
- The file server then encrypts this token with a key shared among itself and the TGS and the client is allowed to use the resources for the time mentioned in the token.

<p align="center">
    <img  src="https://user-images.githubusercontent.com/71633887/229261775-b84d91fd-7c4b-43a6-9655-ce95bfc17488.PNG">
</p>
<h6 align="center" >Shared Keys</h6>

The client and the AS share the secret key which is his password.
AS and the TGS share a secret key.
TGS and the file server share the same secret key.

### To Sum Up : 

Authentication is a complex process, but here is a simplified rundown :

1. Client enters login information.
2. The Kerberos client creates an encryption key and sends a message to the authentication server (AS).
3. The AS uses this key to create a temporary session key and sends a message to the ticket granting service (TGS).
4. TGS grants the client a ticket and server session key.
5. Client uses these to authenticate with the server and get access.

## Implimenting Kerberos Auth Protocol in a MERN App :

Implementing Kerberos authentication into a MERN (MongoDB, Express, React, Node.js) app can be a complex task, as it involves integrating several different technologies and components. Here's a general overview of the steps involved:

 1. Install The Necessary Dependencies On The Server Side :
 ```bash
- "kerberos" library for Node.js

- "passport-kerberos" library for Passport.js

- "express-session" middleware for session management

```

2. Configure the Kerberos server and client:
```bash
- Create a Kerberos realm and a Kerberos principal on the server.

- Generate a Kerberos keytab file that contains the server's credentials.

- Configure the client to use the server's keytab file to authenticate.
```

3. Integrate Kerberos authentication into the MERN app: 
```bash
- Use "passport-kerberos" to configure Passport.js to use Kerberos authentication.

- Use "express-session" to manage user sessions.

- Create routes that require authentication and use Passport.js middleware to authenticate users.

- Use "kerberos" library to validate user credentials and retrieve user information.
```

4. Test the Kerberos authentication:

```bash
- Verify that users can successfully authenticate using Kerberos.

- Verify that authenticated users can access protected routes in the app.
```

5 . Set the realm and KDC keytab path for the krb5 module :

- We set the krb5.realm and krb5.kdc variables to the appropriate values for our server environment. We also set the krb5.keytabPath variable to the path of the keytab file that contains the necessary authentication information :

```bash
krb5.realm = 'MYREALM.COM'; (MYREALM is MSM in This example Which Is My Name )
krb5.kdc = 'kdc.myrealm.com'; (myrealm is MSM in This example Which Is My Name )
krb5.keytabPath = '/path/to/keytab/file';
```

Note that the krb5 module must be configured before it is used to authenticate the user. Therefore, we set the configuration variables at the beginning of the file, before defining the passport strategies and setting up the login and logout endpoints.

## Creation Of Keytab File :

Creating keytab files requires administrative access to the Kerberos realm and the KDC, and the ability to create and manage service principals. It's important to follow best practices for keytab management and keep keytab files secure to prevent unauthorized access.

1. Create a service principal in your Kerberos realm using the kadmin command-line tool. For example, to create a service principal for a web application with a hostname of app.example.com, you could use the following command:

```bash
kadmin: addprinc -randkey HTTP/app.msm.com
```

2. Generate a keytab file for the service principal using the ktadd command in kadmin. For example, to generate a keytab file for the HTTP/app.example.com principal, you could use the following command:
```bash
kadmin: ktadd -k /path/to/app.keytab HTTP/app.msm.com 
```
( This would create a keytab file named app.keytab in the directory specified by /path/to/. 
)

3. Copy the keytab file to the server where your application is running, and make sure the file has the appropriate permissions and is owned by the user account that will be running the application

4. Configure your application to use the keytab file for authentication. The specific steps for this will depend on the programming language and framework you are using for your application.

 Note that these are general steps, and the exact commands and procedures may vary depending on the specific Kerberos implementation you are using and the policies of your organization. It's important to follow best practices for keytab management and keep keytab files secure to prevent unauthorized access.

## MERN Meaning ^_^:

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

**Database:** MongoDB

**Server:** Express

**Client:** React

**Environment :** Node.js

## To Run This MERN App : 

You Need To Execute Server & Client in Different Terminal 

 For Server: 

```bash
  cd server
  npm install 
  node server.js
```
For Client : 

```bash
  cd client
  npm install 
  npm start
```

## Demo Link :

[Demo Live](https://gentle-gingersnap-4e8040.netlify.app/) 

Note : You Need To Generate A Key So this App Can Works 

2023 Copyright © Mohamed Selim Maazouz
