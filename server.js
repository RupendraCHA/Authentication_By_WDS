import express from "express"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())


const users = [

]

app.get("/posts", (req, res) => {
    res.json({ message: "Good" })
})

app.post("/user", async (req, res) => {
    const { name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { name: name, password: hashedPassword }
    users.push(user)
    res.status(200).send(users)
})


app.post("/user/login", async (req, res) => {
    const { name, password } = req.body
    const user = users.find(user => (user.name === name))

    if (!user) {
        return res.status(400).send("Cannot find User!")
    }

    try {
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (isPasswordMatched) {
            res.send("Login Successful!")
        } else {
            res.send("User entered incorrect password!")
        }


    } catch (error) {
        res.status(401).send("Invalid Password")
    }

})

app.listen(3000, () => {
    console.log("Server Running Successfully!")
})