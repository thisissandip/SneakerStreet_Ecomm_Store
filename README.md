# Sneaker Street

Sneaker Street is a JavaScript-based Full-Stack e-commerce web application built for amazing digital shopping experience with animations, interactivity and smooth payment process.

##### [Live Demo](https://sneakerstreet.netlify.app/)

### 🧰 Built with

- Frontend:
  - <a target="_blank" href="https://reactjs.org/" >React</a>
  - <a target="_blank" href="https://redux.js.org/" >Redux</a>
  - <a target="_blank" href="https://greensock.com/gsap/" >GSAP</a>
  - <a target="_blank" href="https://sass-lang.com/" >SCSS</a>
  - <a target="_blank" href="https://formik.org/" >Formik</a>
  - <a target="_blank" href="https://www.netlify.com/" >Netlify</a>
- Backend:
  - <a target="_blank" href="https://nodejs.org/en/" >Node Js</a>
  - <a target="_blank" href="https://expressjs.com/" >Express Js</a>
  - <a target="_blank" href="https://www.mongodb.com/" >Mongo DB</a>
  - <a target="_blank" href="https://jwt.io/" >Json Web Tokens (JWT)</a>
  - <a target="_blank" href="https://stripe.com" >Stripe Payments</a>
  - <a target="_blank" href="https://www.heroku.com/" >Heroku</a>

### :bulb: Features

- Frontend:
  - Landing page with animations and modern minimilistic design.
  - Form fields are verified using Formik.
  - Toast notifications are displayed on user interactions ( Add to cart buttons, Notify me buttons, Subscribe to newsletter buttons )
  - Sort the products according to their price or popularity.
  - Cart component allows to edit the products selected.
  - Checkout using Stripe API.
  - Recive a mail when you subscribe to the newsletter
- Backend:
  - User authentication is done using MongoDB and Express, Facebook sign in authentication is also enabled.
  - User are authenticated and tracked with Json Web Tokens (JWT) and HTTP cookies.
  - MongoDB is used to store the user data and product data.
  - NodeMailer is used for to send mail to the users who subscribe to newsletter.

### 🚀 Development setup

#### Prerequisites

The following software is required to be installed on your system:

- Node 8.x
- Npm 3.x

Type the following commands in the terminal to verify your node and npm versions

```
node -v
npm -v
```

#### Installation

1. Clone the repository

```
git clone https://github.com/thisissandip/what-should-i-watch-next.git
```

2. For Client

- Go to the client folder
  ```
  cd client/sneakerstreetclient
  ```
- Install dependencies
  ```
  npm install
  ```
- Start local development server
  ```
  npm start
  ```
- Build your project
  ```
  npm run build
  ```

3. For Server

- Go to the server folder
  ```
  cd server
  ```
- Install dependencies
  ```
  npm install
  ```
- Start local server
  ```
  npm start
  ```

4. Start Playing!

### 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
