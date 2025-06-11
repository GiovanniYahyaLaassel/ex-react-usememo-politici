import { useEffect, useState } from "react";
import { getPoliticians } from "./services/api";


function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    getPoliticians()
      .then((res) => {
        console.log('Dati ricevuti:', res.data);
        setPoliticians(res.data);
      })
      .catch((err) => {
        console.error('Errore nella chiamata api:', err);
      })
  }, []);

  return (

     <div>
        <h1>Lista Politici</h1>
     </div>

  )
}

export default App
