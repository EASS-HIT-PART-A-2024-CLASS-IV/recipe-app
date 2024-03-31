# Recipe App

Welcome to Recipe App, your go-to tool for discovering and organizing your favorite recipes!

## Features

This application integrates with the [Spoonacular API](https://spoonacular.com/). With Recipe App, you can:

1. **Search for recipes** by providing a list of ingredients.
2. **Get detailed instructions** for preparing each recipe you find.
3. **Manage your recipes** by adding them to your favorites list for easy access later.

All within an advanced UI built with React.js for the best user experience.

## Getting Started

To get the Recipe App running on your machine, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/recipe-app.git
   ```
2. **Navigate to the project's folder**

   ```bash
   cd recipe-app
   ```
3. **_IMPORTANT_ prerequisite**

   Due to security concerns, an API key to access the Spoonacular API is not provided in the repository. To use the Spoonacular features within this app, you'll need to obtain an API key. You can get one by [signing up on the Spoonacular API website](https://spoonacular.com/food-api/console#Dashboard) or by contacting me directly.

   Once you have your API key, follow these steps to configure it within the Spoonacular microservice:
   
   1. Navigate to the `spoonacular` folder.
   2. Create a file named `.env`.
   3. Add your API key to this file in the following format: `API_KEY=YOUR_KEY_HERE`.
   
   Ensure that you replace `YOUR_KEY_HERE` with the actual API key you obtained.
   
4. **Start the application** using Docker Compose:

    ```bash
    docker-compose up
    ```
   
This will build and start all the necessary containers for the application to run. Once the process is complete, you can view and use the application at http://localhost:3000.

## Technical Details

The application is structured around several containers, each serving a different purpose:

- **8000:** Backend microservice
- **8001:** Database microservice
- **8002:** Spoonacular microservice
- **3000:** Recipe-app frontend

The backend microservice exposes the application's features through an API, which then forwards requests to the dedicated microservices:

- The **database microservice** performs CRUD operations on users and recipes.
- The **Spoonacular microservice** fetches recipes and recipe details from the Spoonacular API.
- The **Recipe-app fronend** built in React.js to enable the user to interact with the app with ease.
- Every request from the api is being made to the backend, the backend then delegates the operations to the different microservices

## Illustration

![image](https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/recipe-app/assets/66397204/689da216-fbf5-42d9-b4c6-2dc118a16958)





