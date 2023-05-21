
import { useEffect, useState } from "react"
import {app, database} from "../firebaseConfig"
import { useRouter } from "next/router"
import {collection, addDoc, getDocs} from "firebase/firestore"

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const databaseRef = collection(database,'CRUD Data')
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

  const addData = () => { 
    addDoc(databaseRef, {
      name: name,
      age: Number(age)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName('')
        setAge(null)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }


  return (
   <div>
    <h2>Home Screen</h2>
    <input
      placeholder="Name"
      type="text"
      value={name}
      onChange={event => setName(event.target.value)}
    />

    <input
    placeholder="Age"
    type="number"
    value={age}
    onChange={event => setAge(event.target.value)}
    />
    <button
    onClick={addData}

    >Add</button>
   </div>
  )
}
