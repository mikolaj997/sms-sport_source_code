# Sms-sport 

SMS-Sport is a web application designed to encourage people to engage in sports by using a profitability calculator that compares different physical activities based on time, cost, and calories burned.

🇬🇧 English | 🇵🇱 [Polski](README.pl.md)

> **Note**
>
> This repository contains the public portfolio version of the project.
>
> The original project was developed in a private repository. For security reasons, sensitive configuration files, environment variables, API keys, and other confidential data have been removed.
>
> **Project status:** Maintained and further developed. Ongoing changes are implemented in this branch first.
>
> Project setup instructions are at the end of this file.

**Frontend** 
The frontend is built with React and uses additional libraries such as React Query for communication with the Node.js backend and React Datepicker for date selection. Mapbox API is used to display interactive maps.

**Backend** 
The backend is developed in Node.js, with MongoDB as the database.

## Features
- User registration and login
- Sports profitability calculator (time, cost, and calories burned)
- Interactive map of sports facilities
- Route planning to selected sports facilities
- Transport mode selection affecting travel time and calculator results
- Display of travel routes to selected locations
- Dedicated chat rooms for different sports activities
- Full Polish and English language support with a language toggle

## Screen shots:

### Application

<img width="1848" height="917" alt="image" src="https://github.com/user-attachments/assets/4b5a3c6b-b2e4-4f86-b19d-40cd90470ae3" />

<img width="1850" height="903" alt="image" src="https://github.com/user-attachments/assets/62872ac5-ae88-464b-8184-7edd3469d14b" />

<img width="1857" height="897" alt="image" src="https://github.com/user-attachments/assets/06abba7f-d4e7-485b-84f0-0b432e7a0405" />

<img width="1832" height="916" alt="image" src="https://github.com/user-attachments/assets/1cf9fdd2-0626-48f3-8252-e4fd17ad148f" />


<img width="1858" height="917" alt="image" src="https://github.com/user-attachments/assets/73ee34dc-9f90-4fdf-8ce1-22eb4451ff36" />


<img width="1850" height="897" alt="image" src="https://github.com/user-attachments/assets/10efa3ab-afc1-468a-acf0-0d19e8f0e70c" />



<img width="1831" height="904" alt="image" src="https://github.com/user-attachments/assets/d642e2db-4c2e-4b1c-8d82-251385cb87d8" />

## MongoDB Database Structure:
<img width="1698" height="613" alt="image" src="https://github.com/user-attachments/assets/80fb86e8-adea-4069-94bb-8324de3a349f" />

### Main Collection:
<img width="1306" height="744" alt="image" src="https://github.com/user-attachments/assets/ee2ffb73-2b9f-435f-a31a-f06c23638db9" />

> Note: The original development of this project was carried out in a private repository. This public repository contains a portfolio version of the project with sensitive configuration, API keys, and some project setup files omitted.

## How to Run the Project

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and provide the required values.
4. Start the application:
   ```bash
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and provide the required values.
4. Start the server:
   ```bash
   node index.js
   ```
