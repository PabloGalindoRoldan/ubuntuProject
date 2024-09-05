
Microbusiness Investment Platform
Project Overview

This web application allows users to connect with microbusinesses to arrange investments or finance their development. It features a range of functionalities for both users and administrators, including viewing and interacting with publications, a chatbot, and an admin dashboard with tools for managing microbusiness listings, publications, and contact solicitations.
Features

    Landing Page: Welcome page showcasing microbusiness opportunities.
    Publications: Users can view and interact with publications from various microbusinesses.
    Chatbot: A chatbot is available to assist users with inquiries.
    Admin Dashboard:
        Login via Google OAuth.
        Create, edit, and manage microbusiness listings and publications.
        View monthly statistics (views, microbusinesses created, contact solicitations).
        Manage contact solicitations.
        Upload and manage images using Cloudinary.

Technologies Used

    Frontend:
        React
        JavaScript
        Vite
        Material-UI (MUI)
    Backend:
        Java
        Spring Boot
        Maven
    Third-party Services:
        Cloudinary (for image storage and management)
        Google OAuth (for admin authentication)

Installation and Setup

    Clone the repository:

    bash

git clone <repository-url>

Frontend Setup:

    Navigate to the frontend directory:

    bash

cd frontend

Install dependencies:

bash

npm install

Run the frontend locally:

bash

    npm run dev

Backend Setup:

    Navigate to the backend directory:

    bash

cd backend

Install backend dependencies:

bash

mvn install

Run the backend locally:

bash

        mvn spring-boot:run

    Environment Variables:
        Configure Cloudinary and Google OAuth environment variables for both frontend and backend.

Running the Application

    Frontend: The frontend will be available at http://localhost:5173/.
    Backend: The backend API will be available at http://localhost:8080/.

Ensure that both services are running simultaneously for full functionality.
Authors

Developed by Pablo. Feel free to reach out with questions or feedback!

Let me know if you need further adjustments or additions!
