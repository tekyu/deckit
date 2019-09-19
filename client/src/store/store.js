import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "store/rootReducer";
import socketMiddleware from "store/middlewares/socket";
import { initialStore } from "store/initialStore";

const enhancers = compose(
	applyMiddleware(thunk, socketMiddleware()),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducer, enhancers);
export default store;

// export function subscribeMessages() {
// 	return {
// 	  event: 'message',
// 	  handle: NEW_MESSAGE,
// 	}
//   }

//   export function unsubscribeMessages() {
// 	return {
// 	  event: 'message',
// 	  leave: true,
// 	}
//   }

//   // Action creator with received function:
//   export function joinRoom(data) {
// 	return dispatch => dispatch({
// 	  event: 'join room',
// 	  handle: data => dispatch({
// 		type: 'listener',
// 		payload: data.message,
// 	  }),
// 	});
//   }

//   this.props.socket.on("messageSentToRoom", data => {
// 	this.setState({
// 		messages: [
// 			...this.state.messages,
// 			{
// 				msg: data.msg,
// 				id: data.id,
// 				nickname: data.nickname,
// 				mine: false
// 			}
// 		]
// 	});
// });
