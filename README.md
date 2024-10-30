# Exercise Tracker

As someone who trains for marathons and triathlons, I struggled with the little input you could give mainstream exercise apps. Areas like mood and difficulty of the workout things that current apps could not give me. To fix this, I created my own exercise tracker that gives the user more flexibility to describe how they felt, how they felt they performed, and how hard the workout was.

---

### Folder Descriptions

- **`client`**: Main code for the front end of the application
  - **`index.html`**: Contains the HTML formatting for the website
  - **`index.js`**: Contains logic for uploading workouts and sending that information to the database
- **`public`**: Contains styling files

- **`Database.js`**: Handles user authentication, once the user logs in their information is sent to app.js
- **`app.js`**: Retrieves and configures the user's past workouts based on database records
