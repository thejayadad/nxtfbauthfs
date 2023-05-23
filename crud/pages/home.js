
import { useEffect, useState } from "react"
import {app, database} from "../firebaseConfig"
import { useRouter } from "next/router"
import {collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore"

export default function Home() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false)
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
  
  const getID = (id, name, age) => {
    setID(id)
    setName(name)
    setAge(age)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'CRUD Data', ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'CRUD Data', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert('Data Deleted')
      getData()
    })
    .catch((err) => {
      alert('Cannot Delete that field..')
    })
  }

  const logout = () => {
    sessionStorage.removeItem('Token')
    router.push('/register')
  }

  return (
   <div>
    <h2>Home Screen</h2>
    <button onClick={logout}>Logout</button>
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
       {isUpdate ? (
          <button
            onClick={updateFields}
          >
            UPDATE
          </button>
        ) : (
          <button
            onClick={addData}
          >
            ADD
          </button>
        )}


          <div>
          {fireData.map((data) => {
            return (
              <div>
                <h3>Name: {data.name}</h3>
                <p>Age: {data.age}</p>
                <button
                onClick={() => getID(data.id, data.name, data.age)}

                >Update</button>
                  <button
                  onClick={() => deleteDocument(data.id)}
                >Delete</button>
              </div>
            )
          })}
        </div>
   </div>
  )
}
