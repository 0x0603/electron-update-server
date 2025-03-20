# electron-update-server

A simple update server for electron applications running on macOS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Place your app update files in the `updates` directory:
   - `latest-mac.yml` - Contains the latest version information
   - `MyApp-x.x.x-mac.zip` - Your packaged application

3. Update the `latest-mac.yml` file with:
   - Current version number
   - Correct SHA512 hash of your app
   - Correct file size
   - Current release date

## Running the server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Configuring your Electron app

In your electron app's main process, configure the auto updater:

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'http://your-server:9191/update/darwin'
});

// Check for updates
autoUpdater.checkForUpdates();
```

The server will serve update files from the `updates` directory and provide version information through the `/update/darwin` endpoint.
