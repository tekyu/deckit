
![alt text](https://github.com/tekyu/deckit/blob/master/client/deckit.png "Deckit logo")
# Web implementation of "dixit" game
_Written using React, Typescript & Socket.io, generated via create-react-app_

## Online version 
Available at http://deckit-online.com

## Local version
In order to play locally you need to start both server (you need to do enter server path with `cd server`) and client with `npm start`

### Basic setup

#### View
After you enter main directory you need to open client folder and build the production version
You may also need to install `serve` globally
```
cd client
npm run build
npm i serve -g
```
Then you can serve current build using `serve -s build`. Local address should be copied to your clipboard.

#### Server
Install required dependencies with `npm i`
Go to server directory and start the server using `npm start`.

###### All images were taken from [Pixabay](https://pixabay.com/) and [Unsplash](https://unsplash.com/)


### Task list for further releases

- [ ] Add game rules to room info
- [ ] Chat rooms (for private chats)
- [ ] Registration via login/password
- [ ] Settings panel for registered users
- [ ] Allow to choose multiple decks when creating room (with preview cards)
- [ ] Make couple of themed decks

### Features that might or might not appear further down the road
- [ ] Allow registered users to request new cards (with title and image upload/url, this is tricky because all images must be licensed)
- [ ] Login via facebook/google (w/ firebase auth integration)
- [ ] Ranking system
- [ ] History of played games (w/ round scores)
- [ ] Friends system
- [ ] Mailing system (internal)
- [ ] PWA

### Big ambitions but still reluctant
- [ ] Mobile app w/ React Native
