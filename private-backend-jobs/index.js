const cors = require("cors");
const express = require("express");

const server = express();

server.use(cors({
    origin: "*",
    methods: "*",
}))

server.get("/job-api/jobs", (_, res) => {
    res.json([
        {
            name: "Software Engineer",
            level: "Entry"
        },
        {
            name: "Software Engineer",
            level: "Senior"
        },
    ])
})

server.listen(3000, () => console.log("listen port 3000"));