import { Router } from "express";


const router = Router()

router.get('/', (req, res) =>{
    res.send(`
        <h1> { Bienvenido a mi Api ...⚙ 😎 } </h1>
    `)
})

export default router