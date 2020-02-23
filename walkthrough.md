# STEPS FOLLOWED

## - COPY PASTE THE BROILERPLATE PROVIDED

## - RUN AND SEE IF IT WORKS

```less
brew install node
brew postinstall node
brew tap mongodb/brew
brew install mongodb-community@4.2
mongod --config /usr/local/etc/mongod.conf
brew services start mongodb-community@4.2
mkdir -p ~/data/db
mongod --dbpath /Users/arathyrosetony/data/db
```

### - Start Mongo

```less
sudo mongod
mongo
```

In mongo, type
> use users

### - Run Express (backend)

```less
cd backend
npm install
npm start
```

### Run React (frontend)

```less
cd frontend
npm install
npm start
```

### Output explained

Go to `localhost:3000`. You can see the broilerplate code up and running.

The broilerplate code contains the following:

- Create user
- View list of all users

## Now start coding for the assignment

## Creating models

### Creating the user model

LINK: <https://thinkster.io/tutorials/node-json-api/creating-the-user-model>

But this link is too much work.. so I am using validators as in this link <https://stackoverflow.com/questions/41017254/login-with-email-or-username-with-mongodb-in-node-js>.

### Completing the display of all the users and registration part

The files in the components of the front-end are changed.

### WHAT WE HAVE DONE TILL NOW

- defined the user datamodel
- form for registering a user
- display all the users

We have not done verification of the fields yet.

## DELETING ALL RECORDS FROM THE DATABASE

- Go to mongo server by typing mongo on terminal
- Use `db_name`
- Do `show collections`
- Now to empty all those collections do 'db.<collection_name>.drop()

## LOGGING IN

- On successful login, we store the things in local storage
- We store the username and hashed passwords in the database
- Retrieve it each time we want check something

But hey, we are storing only the id's yo!

That is enough

## STORING SOMETHING IN LOCAL STORAGE

```js
localStorage.getItem("rememberMe")
window.localStorage.setItem('userId', response.payload.userId);
localStorage.removeItem('rememberMe');
```

LINK: <https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage>

### Example

The following snippet accesses the current domain's local Storage object and adds a data item to it using Storage.setItem().

```js
localStorage.setItem('myCat', 'Tom');
```

The syntax for reading the localStorage item is as follows:

```js
var cat = localStorage.getItem('myCat');
```

The syntax for removing the localStorage item is as follows:

```js
localStorage.removeItem('myCat');
```

The syntax for removing all the localStorage items is as follows:

```js
localStorage.clear();
```

## LINKS REFERRED

https://stackoverflow.com/questions/3884281/what-does-the-function-then-mean-in-javascript
https://alligator.io/react/mern-stack-intro/
https://stackoverflow.com/questions/3884281/what-does-the-function-then-mean-in-javascript
http://thecodebarbarian.com/how-find-works-in-mongoose.html
https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09
https://stackoverflow.com/questions/15220339/how-do-i-redirect-users-after-submit-button-click
https://jira.mongodb.org/browse/SERVER-31361
https://www.w3resource.com/mongodb/shell-methods/collection/db-collection-remove.php
https://www.w3schools.com/nodejs/nodejs_mongodb_delete.asp
https://stripe.com/docs/connect/testing-verification

https://www.youtube.com/watch?v=zaWtIkJgah4&list=PL9a7QRYt5fqlWKC_wejtfUHYb9uyS8Cxw&index=23
https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/

https://www.npmjs.com/package/yup
https://www.aspsnippets.com/Articles/Get-selected-Text-and-Value-of-DropDownList-in-OnChange-event-using-JavaScript-and-jQuery.aspx
https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
