
import { useEffect } from "react"
import {app} from "../firebaseConfig"
import { useRouter } from "next/router"

export default function Home() {
  let router = useRouter()
  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      getData()
    }
    if (!token) {
      router.push('/register')
    }
  }, [])

  return (
   <div>
    <h2>Home Screen</h2>
    <input
      placeholder="Name"
    />

    <input
    placeholder="Age"
    />
    <button>Add</button>
   </div>
  )
}
