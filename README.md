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
- Sports profitability calculator (time, cost, and calories burned)
- Interactive map of sports facilities
- Route planning to selected sports facilities
- Transport mode selection affecting travel time and calculator results
- Display of travel routes to selected locations
- Dedicated chat rooms for different sports activities
- Full Polish and English language support with a language toggle

## Screen shots:
<img width="1850" height="903" alt="image" src="https://github.com/user-attachments/assets/62872ac5-ae88-464b-8184-7edd3469d14b" />

<img width="1857" height="897" alt="image" src="https://github.com/user-attachments/assets/06abba7f-d4e7-485b-84f0-0b432e7a0405" />

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
- view shortcut popup wchich describe how to invoke shortcuts and explain map legend
- view the selected locations on the interactive map,
- save the calculated activity to their profile.

<img width="1832" height="916" alt="image" src="https://github.com/user-attachments/assets/1cf9fdd2-0626-48f3-8252-e4fd17ad148f" />

### What users can do in this screen

- view upcoming activities,
- view past activities,
- browse the complete activity history,
- review activity details,
- delete individual activities,
- delete all activities,
- create a new activity.


<img width="1858" height="917" alt="image" src="https://github.com/user-attachments/assets/73ee34dc-9f90-4fdf-8ce1-22eb4451ff36" />

### What users can do on this screen

- View their profile and username.
- Select their preferred activity/sport.
- Select their default means of transport.
- Select their preferred location.
- View their default starting point coordinates.
- Choose a new starting point directly on the map.
- View the route on the map from the starting point to the selected destination.
- View travel information:
  - Travel time.
  - Distance.
  - Means of transport.
- Save preferences.
- Delete saved preferences.

<img width="1852" height="898" alt="image" src="https://github.com/user-attachments/assets/18414d1f-647c-4dcf-8671-9865364db055" />

### What users can do in this screen

- view chats
- post messeges

<img width="1831" height="904" alt="image" src="https://github.com/user-attachments/assets/d642e2db-4c2e-4b1c-8d82-251385cb87d8" />


### What users can do in this screen

- use the calendar to browse activities by date,
- navigate between months,
- view scheduled activities directly on specific days,
- quickly see which days contain activities,
- review the main activity-planning area,
- select a sport, location and means of transport,
- enter activity and travel details,
- calculate activity profitability and calories,
- add a new activity.

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
