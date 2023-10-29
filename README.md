# Care Connect - React Webapp ⚛️

### Attention ⚠️

Our app is using the GoogleMap API. You should get your own token and put it in the MapContainer component

```js
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY!!!",
  });
```



## Requirements

 How to Install Node.js

Node.js is a popular JavaScript runtime environment that allows you to run JavaScript code on your computer. Follow these steps to install Node.js on your system.

## Prerequisites

Before you begin, ensure that you have administrative access to your computer, and you are connected to the internet.

## Installation Steps

1. **Download Node.js Installer:**

   Visit the official Node.js website at [nodejs.org](https://nodejs.org/). 

2. **Run the Installer:**

   - **For Windows:**

     Run the downloaded Windows Installer executable (.msi) file. 

   - **For macOS:**

     Open the downloaded .pkg file, and a macOS installer window will appear.

   - **For Linux:**

     Extract the downloaded binary archive to your preferred location. You might need SUDO previledge

3. **Verify Installation:**

   After installation, open your system's terminal or command prompt and enter the following commands to verify that Node.js and npm (Node Package Manager) were installed correctly:

   ```
   shellCopy code
   node -v
   npm -v
   ```

   These commands should display the installed Node.js version and npm version without any errors.

### Libraries & Dependencies

---

*below are just a part of the libraries worth to be mentioned*

- **Notistack** - a library required for our alert messages UI
- **GoogleMap API** - the library built for configuring details inside Google Map
- **React-Redux** - the library we use to manage the global states

#### How to install these dependencies?

simply run: 👇

```
npm install
```
