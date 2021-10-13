// @ts-nocheck
const RoomService = (app: any) => {
  console.log('RoomService loaded');
  const rooms = {};
  app.post('/api/getRooms', (req, res) => {
    res.status(200).send(rooms);
  });
};

export default RoomService;
