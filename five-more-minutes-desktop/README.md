# Five More Minutes (desktop)

Start with a 5-minute session. At 4:00 the app pops up on top of whatever you are doing and asks if you can do 5 more minutes. Press Space (a wireless Space key works) to say yes. Two yeses at 5 minutes raise the ask to 10, two yeses at 10 raise it to 15. When you say no, you get a break equal to 25% of your focus time.

## Run it

1. Install Node.js (https://nodejs.org), the LTS version.
2. In this folder, run:

       npm install
       npm start

On Windows you can double-click `start-windows.bat` instead. On Mac or Linux, run `./start.sh`.

## Get a program with no Node.js install

Put this folder in a new GitHub repository (the `.github` folder must go with it). GitHub builds the app for you: open the repository's Actions tab, open the latest "Build app" run, and download the artifact for your system. On Windows it is a single `.exe` that runs without installing anything. Mac gets a `.dmg` and Linux an `.AppImage`.

## Make an installer yourself

    npm run dist

The installer appears in the `dist` folder (.exe on Windows, .dmg on Mac, .AppImage on Linux). Build on the system you want to install on.

## How the pop-up works

- When the question appears, the window restores, comes to the front, stays on top, and flashes in the taskbar.
- While the question is showing, Space is also registered as a system-wide shortcut, so it answers yes even if your system does not let the window take focus. It is released as soon as you answer or time runs out.
- If the window was minimized or behind other windows, it tucks itself away again after you answer.
- Leave the app running in the background during your session. Closing the window quits the app.

## Pairing your remote Space key

Any wireless key or remote that sends a normal Space keypress will work. Pair it to this computer through your Bluetooth or USB receiver settings first. If it sends a different key, say which one and the shortcut can be changed in `main.js`.
