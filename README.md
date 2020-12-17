# SkillsUp

![pexels-matt-hardy-2179205](/src/images/creativity.jpg)

## Description

This is an app that allows anyone from the community to host and attend workshops. You can host a workshop on absolutely any topic and also participate in others to improve your skills.

## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start signing up for workshops and also host my own
- **Login:** As a user I can login to the platform so I can sign up for workshops and host my own
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Host workshops** As a user I can host workshops which grant me credit points
- **Edit workshops** As a user I can edit the workshops that I host
- **Delete workshops** As a user I can delete workshops that are hosted by me
- **Attend workshops** As a user I can attend workshops offered by the platform or other users
- **Cancel participance **As a user I can cancel workshops that I have signed up for
- **View workshops** As a user I want to see the workshops available
- **Search workshops** As a user I can look for a specific workshop by category or keyword searches

## Backlog

User profile:

- Write reviews on attended workshops
- Edit and delete user
- Implement Google Maps for Location
- Implement error messages on Login and Signup Page
- make site desktop and tablet responsive

# Client / Frontend

## React Router Routes (React App)

| Path                            | Component           | Permissions                | Behavior                                                                                       |
| ------------------------------- | ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `/`                             | HomePage            | public `<Route>`           | Home page with intro, searchbar and categories                                                 |
| `/instructions`                 | InstructionsPage    | public `<Route>`           | Explains how app works                                                                         |
| `/signup`                       | SignupPage          | anon only `<AnonRoute>`    | Signup form, link to login, navigate to profile after signup                                   |
| `/login`                        | LoginPage           | anon only `<AnonRoute>`    | Login form, link to signup, navigate to profile after login                                    |
| `/workshops/category/:category` | WorkshopListPage    | public `<Route>`           | Shows all workshops in a list by category                                                      |
| `/workshops/:id`                | WorkshopDetailsPage | public `<Route>`           | Details of a workshop and signup button                                                        |
| `/private/profile`              | ProfilePage         | user only `<PrivateRoute>` | View of wallet, hosted/to be attended workshops, contains add workshop and edit workshop forms |

## Components

- LoginPage

- SignupPage

- HomePage

- InstructionsPage

- WorkshopListPage

- WorkshopDetailsPage

- ProfilePage

- WorkshopCard

- AddWorkshop

- EditWorkshop

- CategoryCard

- SeachBar

- Navbar

- Footer

## Services

- Auth Service

  - authService.login(username, password)

  - authService.signup(username, img, email, password)

  - authService.logout()

  - authService.me()

  - authService.uploadImage(uploadData)

- Workshop Service

  - workshopService.getAllWorkshops()

  - workshopService.getUser()

  - workshopService.getOneWorkshop()

  - workshopService.signupForWorkshop(id, userId)

  - workshopService.getWorkshopsByCategory(category)

  - workshopService.getOneWorkshop(title,

    ​ img,

    ​ description,

    ​ date,

    ​ category,

    ​ length,

    ​ credits,

    ​ maxParticipants,

    ​ location,

    ​ userId)

  - workshopService.uploadImage(uploadData)

  - workshopService.editOneWorkshop(id,

    ​ title,

    ​ img,

    ​ description,

    ​ date,

    ​ category,

    ​ length,

    ​ credits,

    ​ maxParticipants,

    ​ location,

    ​ userId)

  - workshopService.deleteOneWorkshop(id, userId)

  - workshopService.cancelOneWorkshop(id, userId)

# Server / Backend

## Models

User model

```
{
  username: {type: String, required: true, unique: true},
  img: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  hostedWorkshops: [{type: Schema.Types.ObjectId, ref: "Workshop"}],
  attendedWorkshops: [{type: Schema.Types.ObjectId, ref: "Workshop"}],
  wallet: {type: Number, default: 30}
}
```

Workshop model

```
 {
   title: {type: String, required: true},
   img: {type: String, required: true},
   description: {type: String, required: true},
   category: {type: String, required: true},
   date: {type: Date, required: true},
   length: {type: Number, required: true},
   credits: {type: Number, required: true},
   maxParticipants: {type: Number, required: true},
   participants: [{type: Schema.Types.ObjectId, ref:'User'}],
   host: {type: Schema.Types.ObjectId,ref:'User', default: null},
   location: {type: String, required: true}
 }
```

## API Endpoints (backend routes)

| HTTP Method | Request Body                                                                                             | URL                                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | Saved session                                                                                            | `/auth/me`                          | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | {username, img, email, password}                                                                         | `/auth/signup`                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | {username, password}                                                                                     | `/auth/login`                       | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | (empty)                                                                                                  | `/auth/logout`                      | 204            | 400          | Logs out the user                                                                                                               |
| GET         |                                                                                                          | `/workshops`                        | 200            | 400          | Returns all workshops                                                                                                           |
| GET         |                                                                                                          | `/api/workshops/category/:category` | 200            | 400          | Returns all workshops by category                                                                                               |
| GET         |                                                                                                          | `/api/workshops/:id`                | 200            | 400          | Returns a specific workshop by Id                                                                                               |
| POST        | {title,img,description, category, date, length, credits, maxParticipants, locations, participants, host} | `/api/workshops`                    | 201            | 400          | Creates and saves a new workshop                                                                                                |
| PUT         | {title,img,description, category, date, length, credits, maxParticipants, location, userId}              | `/api/workshops/:id`                | 200            | 400          | Edit sworkshop                                                                                                                  |
| DELETE      | {userId}                                                                                                 | `/api/workshops/:id`                | 204            | 400          | Deletes workshop                                                                                                                |
| POST        | {userId}                                                                                                 | `/workshops/signup/:id`             | 200            | 400          | Signs up the user to a new workshop                                                                                             |
| POST        | {userId}                                                                                                 | `/workshops/cancel/:id`             | 200            | 400          | Cancels user's participance to workshop                                                                                         |

## Links

### Trello Boards

https://trello.com/b/4GHqRYLT/module-3

### Wireframes

https://www.figma.com/file/CjRo3s4nadKkFgfR4rEOfU/Project-3?node-id=1%3A237

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](https://skills-up-app.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1-Gvj4VxV89Ebe-0QymNUCKC_m6XWNGzsRtbyHIWVQ58/edit?usp=sharing)
