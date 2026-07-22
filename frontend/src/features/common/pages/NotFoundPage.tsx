import { redirect } from "@tanstack/react-router"

export default function NotFoundPage(){
  return (
  <div>
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <button onClick={()=>{throw redirect({to:'/login'})}}>Go Home</button>
  </div>
  )
}