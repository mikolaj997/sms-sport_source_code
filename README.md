# Sms-sport 

SMS-Sport is a web application designed to encourage people to engage in sports by using a profitability calculator that compares different physical activities based on time, cost, and calories burned.

🇬🇧 English | 🇵🇱 [Polski](README.pl.md)

> **Note**
>
> This repository contains the public portfolio version of the project.
>
> The original project was developed in a private repository. For security reasons, sensitive configuration files, environment variables, API keys, and other confidential data have been removed.
>
> **Project status:** Maintained and further developed. Ongoing changes are implemented in the `dev` branch
>
> Also please refer to the `dev` branch for setup instructions and the required environment variables.

**Frontend** 
The frontend is built with React and uses additional libraries such as React Query for communication with the Node.js backend and React Datepicker for date selection. Mapbox API is used to display interactive maps.

**Backend** 
The backend is developed in Node.js, with MongoDB as the database.

## Features
- Sports profitability calculator (time, cost, and calories burned)
- Interactive map of sports facilities
- Route planning to selected sports facilities
- Transport mode selection affecting travel time and calculator results
- Display of travel routes to selected locations
- Dedicated chat rooms for different sports activities

## Screen shots:
<img width="1866" height="919" alt="Zrzut ekranu 2026-07-24 125659" src="https://github.com/user-attachments/assets/7cbd5e78-3436-44ab-a25e-bfb344627b82" />

![image](https://github.com/user-attachments/assets/b11afaad-2920-4009-ad6b-8c73f985c0c6)
### Short list description of the previous two screens:
- select a sport,
- choose the activity location,
- change the starting location,
- select the means of transport,
- enter their weight,
- specify travel time, activity duration, activity cost, and travel cost,
- choose the activity start date and time,
- calculate the profitability of the activity,
- estimate the number of calories burned,
- view the selected locations on the interactive map,
- save the calculated activity to their profile.

![image](https://github.com/user-attachments/assets/f5eb70c7-be45-4f8a-aab9-d95b0979efb2)

### What users can do in this screen

- view upcoming activities,
- view past activities,
- browse the complete activity history,
- review activity details,
- delete individual activities,
- delete all activities,
- create a new activity.

![image](https://github.com/user-attachments/assets/968ede33-8cc8-48b3-ae83-a5d67a9b8bbb)
### What users can do in this screen

- view chats
- post messeges

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
