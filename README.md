# Giggl
Giggl is a real-time chat app, similar to WhatsApp, that allows users to send messages/images to each other. It allows users to filter by online users, change the theme of the application, and has built-in authentication for security. This project was developed using JavaScript, with React for the frontend, MongoDB for the backend, and Socket.io for the real-time features. The application also uses a mix of TailwindCSS and DaisyUI for styling, with the optional theme toggle to switch between light/dark mode.

[Hosted Version](https://giggl.onrender.com/login)


# Project Higlights
🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand

  ## Setup instructions

  
### Setup .env file

```js
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
