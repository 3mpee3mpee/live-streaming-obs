# live-streaming-obs

# About
This project is a starting boilerplate with ready to go streaming server, chat websocket server and next.js client.
The user 
Streaming server is using <a href="https://github.com/illuspas/Node-Media-Server">node-media-server</a> package.

# Usage
In order to run the project:
<ul>
  <li>Configure .env and .env.local files for chat and client's folder (Please take a look at example env files attached)</li>
  <li>"npm install" every folder to install the needed dependencies.
  <li>Run every instance after, you may run on by on terminals using "npm run start" or use "pm2" package to controll the process</li>
  <li>Configure OBS Settings > Stream > Service (Custom) > Server (rtmp://localhost/live) > Stream Key (ANY USERNAME YOU WANT TO USE)</li>
  <li>After you pressed "Start Streaming" button and the color indicator in OBS switched to green you are ready to go!</li>
  <li>Now you may open "http://localhost:3000/" and see that video player and chat are working</li>
</ul>
