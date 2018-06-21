
![alt text](https://github.com/tekyu/deckit/blob/master/client/deckit.png "Deckit logo")
# Web implementation of "dixit" game
_Written using React & Socket.io, generated via create-react-app_

## Online version 
Available at http://deckit-online.com

## Local version
It is possible to play locally, although internet connection is still required due to serving card images over cdn. 
If you want to play offline, you need to change image url in `/server/src/cards/cards.js`


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
- [ ] Write tests for frontend/backend (__VERY important__)
- [ ] Refactor server side (__important__)
- [ ] Refactor redux store (__important__)
- [ ] Refactor create/join room modals as portals
- [ ] Responsive version for mobile users
- [ ] Implement pausing game (via vote system or owner of the room)
- [ ] Read socket id from localStorage and reconnect to all paused rooms
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
- [ ] Create site that aggregate realtime board games
