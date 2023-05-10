import { createClient } from "contentful"
const SPACE = process.env.SPACE!
const ACCESSE_TOKEN = process.env.ACCESSE_TOKEN!

const client = createClient({
    space: SPACE,
    accessToken: ACCESSE_TOKEN
})

export default client