import { useEffect, useState } from "react";
import { getPoliticians } from "./services/api";
import CardPolitico from "./components/CardPolitico";
import './App.css';


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

        {/* Stampo la lista di poilitici */}
        {politicians.map((p) => (
          <CardPolitico
            key={p.id}
            name={p.name}
            image={p.image}
            position={p.position}
            biography={p.biography}
          />
          
        ))}
     </div>

  )
}

export default App
