const cors = require("cors");
const express = require("express");

const server = express();

server.use(express.json());
server.use(cors({
    origin: "*",
    methods: "*",
}))

const obj = [
    {
        name: "Erik",
        age: 23
    },
    {
        name: "Vitor",
        age: 23
    }
]

server.get("/user-api/users", (_, res) => {
    res.json(obj)
})

server.post("/user-api/user", (req, res) => {
    const body = req.body;

    obj.push(body);
    res.json(obj)
})

server.listen(3000, () => console.log("listen port 3000"));