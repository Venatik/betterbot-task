# BetterbotApp

https://github.com/Venatik/betterbot-task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

# Angular E-commerce Application

A modern, responsive e-commerce application built with Angular 18, featuring a product catalog, shopping cart, and checkout process.

## Features

- **Product Catalog**

  - Display products in a responsive grid layout
  - Filter products by category
  - Search products by title and description
  - Real-time product filtering
  - Product rating display

- **Shopping Cart**

  - Add/remove products
  - Cart total calculation
  - Persistent cart state using signals
  - Responsive cart table view

- **Checkout Process**
  - Shipping information collection
  - Form validation
  - Dynamic country/state selection
  - Order summary

## Technical Stack

- Framework: Angular 18
- UI Components: Angular Material
- State Management: Angular Signals
- Form Handling:
  - Reactive Forms (Search)
- Template-driven Forms (Checkout)
- HTTP: Angular HttpClient
- Styling: SCSS
- Architecture: Standalone Components

## Installation

1. Clone the repository:
   `git clone git@github.com:Venatik/betterbot-task.git`

2. Navigate to the project directory

3. Install dependencies
   `npm i`

4. Start the development server

```
   ng serve
   navigate to http://localhost:4200/
```

## API Integration

Data fetched from The Fake Store API: https://fakestoreapi.com/

Endpoints used: GET /products, GET /products/categories

## State Management

Angular signals used for state management.

Product state in ProductsComponent.
Cart state in CartService.
Filtered products state for search and category filtering.

## Components

- HomeComponent - the main container for product display and filtering.

- ProductComponent - displays individual product details. Discount is randomly calculated between 5% and 15% since the API does not provide discount data.

- ProductDetailsComponent - displays detailed product information and enables add to cart functionality.

- CartComponent - manages shopping cart display and calculations.

- CheckoutComponent - handles user checkout information.

## Services

- ProductsService - fetches product data from the API.

- CartService - manages cart state and operations using signals.

- FilterService - manages product filtering state.

## Contact

- For any questions or feedback, please contact me at: stefan.trajkovski008@gmail.com

## Bonus Features

- Loading spinner (network throttle to see it in action)
- Persistent search and category filter
