import { useEffect, useMemo, useState } from "react";
import { getPoliticians } from "./services/api";
import CardPolitico from "./components/CardPolitico";
import './App.css';


function App() {
  const [politicians, setPoliticians] = useState([]);

  // Stato per il campo di ricerca
  const [search , setSearch] = useState("");
  // funzione per gestire l'input
  function handleSearchChange(e) {
    setSearch(e.target.value);
    // console.log("Valore digitato:", e.target.value);
  }

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

  const filteredPoliticians = useMemo(() => {
    // Ritorno un array filtrato
    return politicians.filter((p) => {
      const name = p.name.toLowerCase();
      const bio = p.biography.toLowerCase();
      const searchText = search.toLowerCase();

      // controllo se il testo è incluso nel nome o nella biografia 
      return name.includes(searchText) || bio.includes(searchText);
    })
  }, [politicians, search]);

  return (

     <div>

        <input  
          type="text"
          placeholder="Cerca per nome o biografia"
          value={search}
          onChange={handleSearchChange}
        />

        <h1>Lista Politici</h1> 

        {/* Stampo la lista di poilitici */}
        {filteredPoliticians.map((p) => (
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
