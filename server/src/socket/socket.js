
const initializeServer = (io) => {
  io.on("connection", (socket) => {
    console.log("user is connected : ", socket.id);

    socket.on("disconnect", () => {
      console.log("user is connected : ", socket.id);
    });
  });
};

module.exports = {initializeServer}