# QKart - E-commerce Application

QKart is a full-featured e-commerce web application that offers a variety of products to customers. It provides features like user authentication, shopping cart management, checkout, and product search, with a responsive design for seamless experiences across different devices.

## Features

### 1. **User Authentication**

- **Registration & Login**: Users can register and log in using a simple form.
- **Form Validation**: Provides real-time validation to ensure correct input.
- **Session Persistence**: Uses `localStorage` to keep users logged in after revisiting.

### 2. **Product Browsing and Search**

- **Product List**: Displays a list of products dynamically fetched from the backend.
- **Search Bar**: Allows users to search products using a debounced search bar for better UX and reduced API calls.
- **Responsive UI**: Ensures a uniform experience across devices, with adaptive layouts.

### 3. **Shopping Cart & Checkout**

- **Add to Cart**: Users can add products to their cart and view them in a dynamically updated UI.
- **Cart Views**: Different views for cart items on the Products page and the Checkout page.
- **Checkout Flow**: Implements address management and validation to complete purchases.

### 4. **Routing**

- **React Router**: Supports smooth navigation between different pages.
- **Route Protection**: Only authenticated users can access the checkout page.

## Tech Stack

- **React.js**: Built the front-end interface using reusable components and hooks.
- **REST APIs**: Fetches data and interacts with the backend for user authentication and product information.
- **Material UI**: Used for responsive design and improving the overall UI experience.
- **React Router**: Handles the routing logic for navigating between pages.
- **LocalStorage**: Stores user data on the client side to persist login sessions.
- **Debouncing**: Reduces API calls during search for better performance.

## Installation

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/adityaamaiya/QkartFrontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd qkart
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Deployment

The project has been deployed to Vercel. Visit the live demo [here](https://qkart-frontend-six-chi.vercel.app/).

## Screenshots

### 1. QKart Component Architecture

![Component Architecture](https://i.imgur.com/vpH1zXv.png)

### 2. Request-response cycle for QKart User signup and login

![Request-response cycle](https://i.imgur.com/jW5xf9K.png)

### 3. Products Page

![Products Page](https://i.imgur.com/0pCUvWm.png)

### 4. User flow on website for signup and login

![User flow on website for signup and login](https://i.imgur.com/dGjH0Zx.png)

### 5. Checkout Page

![Checkout Page](https://i.imgur.com/UgVSU3i.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
