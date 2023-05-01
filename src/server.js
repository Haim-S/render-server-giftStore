const server = require("./app/app");
const MongoConnection = require("./mongoDB/connection");






MongoConnection()

const port = process.env.PORT || 4300;

server.listen(port, ()=> {
    console.log(`we going to port ${port}`);
})