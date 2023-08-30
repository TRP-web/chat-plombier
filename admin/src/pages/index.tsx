import React from "react"
import backEnd, { IUrls } from "../api/back-end"
import { useRouter } from "next/router"

const Index: React.FC = () => {
   const [password, setPassword] = React.useState<string>("")
   const [error, setError] = React.useState<string>()
 
   const router = useRouter()
   const submitHandler = async () => {

      try {
         backEnd.post<{ message: string, token: string }>(
            IUrls.login, { password }, { withCredentials: true }
         ).then(res => {
            router.push("/data")
         }).catch(err => setError(err.response.data.message))
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <>
         <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-black" placeholder="Пароль" />
         <button className="block border border-black cursor-pointer" onClick={submitHandler}>Проверка</button>
         <div className="text-red-600 font-bold">
            {
               error ?
                  <>
                     error: {error}
                  </>
                  : null
            }
         </div>
      </>
   )
}
export default Index

