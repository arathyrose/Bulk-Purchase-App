# BULK PURCHASE APP

Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.

## HOW TO RUN

In one terminal, run `mongodb`

```less
rm -rf /Users/arathyrosetony/data/db
mkdir /Users/arathyrosetony/data/db
mongod --dbpath /Users/arathyrosetony/data/db
```

In another terminal, run the backend

```less
cd backend
npm install
npm start
```

In another terminal, run the frontend

```less
cd frontend
npm install
npm start
```

If there is existing data which you would like to remove, do the following:

- Go to mongo server by typing mongo on terminal
- Use `db_name`
- Do `show collections`
- Now to empty all those collections do 'db.<collection_name>.drop()

## TECHNOLOGIES USED

For this assignment, you are required to make a web app with:

- Frontend in ​React.js
- Backend using ​Express.js​ which implements a ​REST​ API
- Database in ​MongoDB

## USE CASES

### 1. USER MANAGEMENT

There are two types of users - Vendors and Customers. Each of them have their own use-cases

### 1.1. LOGIN PAGE

It has an option to enter the username and password, and then login. There is also an option to register in case the user does not have an existing account.

#### 1.2. REGISTRATION PAGE

During registration, there would be the option to select between customer and vendor type. Here the user enters his full name, email address, phone number, address etc etc.

### 2. VENDOR USE CASES

#### 2.1. CREATE NEW PRODUCT

Create a new product specifying its Name, Price, and Quantity in the Bundle

#### 2.2. VIEW ALL PRODUCTS ISSUED BY HIM/HER

Should be able to view all the current product listing done by him/her

- There should be an option to take down a listing making sure that customers get their product status as canceled.
- Once the product is ready to dispatch (i.e. when it has been ordered bysufficient people), it is removed from this view and becomes ready todispatch

#### 2.4. VIEW ALL ORDERS READY TO DISPATCH

Should have a button to dispatch the product which removes it from this view.

#### 2.5. VIEW ALL DISPATCHED ORDERS WITH REVIEWS AND RATINGS PER ORDER

All dispatched orders should be displayed in another view with the reviews and ratings of each order.

### 3. CUSTOMER USE CASES

#### 3.1. SEARCH FOR PRODUCT

- Exact string matching would do
- All the vendors selling that product should be displayed along with their price and quantity remaining
- sort by price or quantity of items remaining or rating of the seller (<https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/> done on front end)

#### 3.2. ORDER PRODUCT

- select product
- specify quantity desired
- place order

#### 3.3. VIEW ORDER STATUS

- dispatch status {Waiting,Placed,Dispatched,Canceled}
  - Waiting (If not enough orders have been placed meeting the minimum bulk quantity requirement by the seller)
    - Quantity left for the order to get placed
    - Option to edit the order if not in the dispatched state
  - Placed (If the quantity requirements are met but is yet to get dispatched by the seller in his/her portal)
    - Rate vendor
  - Dispatched (If the seller accepts the order in his/her portal)
    - give a product review along with a rating once theproduct has been dispatched.
  - Canceled (If the seller cancels the order in his/her portal)

## FRONTEND

### COMPONENTS

- customer
- login
- vendor

## BACKEND

### MODEL DESCRIPTION

#### ORDER

| NAME     | TYPE   | REQUIRED | OTHERS |
| -------- | ------ | -------- | ------ |
| product  | String | true     | -      |
| quantity | Number | true     | -      |
| vendor   | String | true     | -      |
| customer | String | true     | -      |
| rating   | Number | -        | -      |
| review   | String | -        | -      |

#### PRODUCT

| NAME               | TYPE   | REQUIRED | OTHERS                                                                            |
| ------------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| name               | String | true     | -                                                                                 |
| price              | Number | true     | -                                                                                 |
| total_quantity     | Number | true     | -                                                                                 |
| quantity_remaining | Number | true     | -                                                                                 |
| vendor             | String | true     | -                                                                                 |
| images             | String | -        | default: ""                                                                       |
| description        | String | -        |
| status             | String | -        | enum: ['Waiting', 'Placed', 'Dispatched', 'Cancelled'],        default: 'Waiting' |

#### USER

| NAME     | TYPE   | REQUIRED | OTHERS                       |
| -------- | ------ | -------- | ---------------------------- |
| username | String | true     | unique: true                 |
| password | String | true     | -                            |
| email    | String | true     | unique: true                 |
| address  | String | -        | -                            |
| phone    | String | -        | -                            |
| type     | String | -        | enum: ['Vendor', 'Customer'] |

#### VENDOR RATING

| NAME     | TYPE   | REQUIRED | OTHERS |
| -------- | ------ | -------- | ------ |
| customer | String | true     | -      |
| vendor   | String | true     | -      |
| review   | String | true     | -      |
| rating   | Number | true     | -      |

### API ROUTES

#### USERS

| API_ROUTE          | TYPE | DESCRIPTION                        |
| ------------------ | ---- | ---------------------------------- |
| /user/showall      | GET  | Get all users                      |
| /vendor/showall    | GET  | Get all vendors                    |
| /user/getnames/    | GET  | Get the names and IDs of all users |
| /user/register     | POST | Add a new user                     |
| /user/name/:id     | GET  | Get username by id                 |
| /user/:id          | GET  | Get a user by id                   |
| /user/login        | POST | Login given username and password  |
| /user/get_type/:id | GET  | get the user type given id         |

#### PRODUCTS

| API_ROUTE                    | TYPE   | DESCRIPTION                                               |
| ---------------------------- | ------ | --------------------------------------------------------- |
| /product/showall             | GET    | Get the details of all products                           |
| /product/showallwaiting      | GET    | Get all the products in the waiting state                 |
| /product/getnames            | GET    | Get the list of product IDs with their names and statuses |
| /product/add                 | POST   | Add a new product                                         |
| /product/:id                 | GET    | Get product details by id                                 |
| /product/name/:id            | GET    | Get product name by id                                    |
| /product/status/:id          | GET    | Get product status by id                                  |
| /product/name/:name          | GET    | Get all product details by name                           |
| /product/vendor/:id          | GET    | Get all products by vendor                                |
| /product/order_decrement/:id | PUT    | remove the order_value from quantity remaining            |
| /product/change_status/:id   | PUT    | change the status to gievn status                         |
| /product/reset_quantity/:id  | PUT    | reset the quantity remaining                              |
| /product/:id                 | DELETE | delete a product by id                                    |

#### ORDERS

| API_ROUTE                  | TYPE   | DESCRIPTION                     |
| -------------------------- | ------ | ------------------------------- |
| /order/showall             | GET    | Get all orders                  |
| /order/add                 | POST   | Add a new order                 |s
| /order/:id                 | GET    | Get order by id                 |
| /order/customer/:id        | GET    | Get all orders by customer id   |
| /order/vendor/:id          | GET    | Get all orders by vendor        |
| /order/product/:id         | GET    | Get all orders for a product    |
| /order/:id                 | DELETE | delete order by id              |
| /order/review/:id          | PUT    | review order by id              |
| /order/change_quantity/:id | PUT    | change the quantity of an order |

#### VENDOR RATING

| API_ROUTE            | TYPE | DESCRIPTION                                     |
| -------------------- | ---- | ----------------------------------------------- |
| /rating/showall      | GET  | Get all the ratings                             |
| /rating/add          | POST | Add a new rating                                |
| /rating/add          | POST | Change a rating                                 |
| /rating/:id          | GET  | Get a rating by id                              |
| /rating/vendor/:id   | GET  | Get all ratings of a vendor                     |
| /rating/customer/:id | GET  | Get all ratings of a customer                   |
| /rating/view         | POST | view the rating of the customer with the vendor |
| /vendor/rating/:id   | GET  | Get the average rating of a vendor              |
| /avg_rating          | GET  | Get the average rating of all the users         |

## MERN Stack Boilerplate

### Setup

#### Node

For Linux:

```less
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:

```less
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```less
npm install -g create-react-app
```

To create a new React app:

```less
create-react-app name_of_app
```

To run the app, cd into the directory and do:

```less
npm start
```

### Running the boilerplate

Run Mongo daemon:

```less
sudo mongod
```

Mongo will be running on port 27017.

To create a database:

```less
mongo
```

This will open the mongo shell. Type in ```use users``` to create a new database called users.

Run Express:

```less
cd backend/
npm install
npm start
```

Run React:

```less
cd frontend
npm install
npm start
```

Navigate to localhost:3000/ in your browser.
