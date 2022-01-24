import tlqkf from "./tlqkf/index.js"
import whwrkxsp from "./whwrkxsp/index.js"

import express from "express"
const app = express()
const PORT = 3000

app.use(express.json())

app.use("/meal", tlqkf)
app.use("/time", whwrkxsp)

const server = app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
