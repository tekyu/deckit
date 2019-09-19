import chalk from "chalk";

interface Iparams {
  id: string;
  nickname?: string;
  avatar?: string;
  ranking?: number;
}

const Room = socket => {
  console.log("Room events");
  socket.on("createRoom", params => {
    console.log("createRoom", params);
    socket.emit("createRoom", { created: true });
  });
};

export default Room;
