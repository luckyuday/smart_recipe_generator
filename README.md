# Smart Recipe Generator

## Project Overview
The Smart Recipe Generator is a full-stack web application designed to help users find recipes based on the ingredients they have available. This project was developed as a technical assessment for a Software Engineering position at [Company Name].

The application features:
* **Dynamic Recipe Search:** Users can search for recipes by typing in a list of ingredients.
* **Filtering Options:** Recipes can be filtered by difficulty and dietary preferences.
* **Recipe Details:** Users can click on a recipe to view detailed instructions, nutritional information, and other key details.
* **User Feedback:** The application includes a rating system that allows users to rate recipes, with a homepage that displays the top-rated recipes as a recommendation feature.
* **Responsive Design:** The interface is built to be clean, intuitive, and fully responsive on all devices.

## Technology Stack
The application is built using a modern MERN (MongoDB, Express, React, Node.js) stack, leveraging my previous experience building projects like the "Moody Player."

* **Frontend:** **React** with **Vite** and **Axios** for a fast and efficient user interface.
* **Backend:** **Express.js** to create a RESTful API for handling data requests.
* **Database:** **MongoDB** with **Mongoose** for a flexible and scalable NoSQL database.
* **Styling:** Custom **CSS** for a clean and professional look.

## Local Development
To set up and run this project on your local machine, follow these steps.

### Prerequisites
* Node.js (LTS version)
* MongoDB (running locally or a cloud instance like MongoDB Atlas)

### Backend Setup
1.  Navigate to the `smart-recipe-backend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file with your MongoDB connection string:
    ```bash
    MONGODB_URI="your_mongodb_connection_string"
    ```
4.  Run the data import script to populate your database with recipes:
    ```bash
    node import_data.js
    ```
5.  Start the backend server:
    ```bash
    node server.js
    ```
    The server will run on `http://localhost:3000`.

### Frontend Setup
1.  Navigate to the `smart-recipe-frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:5173`.

## Deliverables
* **Working Application URL:** (https://smart-recipe-generator-1-z5u4.onrender.com)
* **GitHub Repository:** [https://github.com/luckyuday/smart_recipe_generator/]
* **Brief Write-up:** A short document detailing the technical approach and problem-solving logic is also included in this repository.
