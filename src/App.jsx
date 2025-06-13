import { useEffect, useMemo, useState } from "react";
import { getPoliticians } from "./services/api";
import CardPolitico from "./components/CardPolitico";
import './App.css';

function App() {
  // Stato per la lista dei politici
  const [politicians, setPoliticians] = useState([]);

  // Stato per il campo di ricerca (input controllato)
  const [search , setSearch] = useState("");

  // Gestico il cambio valore nell'input
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  // Chiamo API al primo render per ottenere i dati 
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

  //  Calcolo dell'array filtrato usando useMemo per evitare ricalcoli inutili
  const filteredPoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const name = p.name.toLowerCase();
      const bio = p.biography.toLowerCase();
      const searchText = search.toLowerCase();

      // controllo se il testo è incluso nel nome o nella biografia 
      return name.includes(searchText) || bio.includes(searchText);
    })
  }, [politicians, search]);

  // Funzione per rendere la lista o un messaggio se è vuota
  function renderPoliticiansList () {
    if ( filteredPoliticians.length === 0 ) {
      return <p>Nessun politico trovato per : <strong>"{search}"</strong></p>;
    }

    // Rendering dinamico della lista dei politici
    return filteredPoliticians.map((p) => (
      <CardPolitico
      key={p.id}
      name={p.name}
      image={p.image}
      position={p.position}
      biography={p.biography}
      />
      
    ));
  }

  return (

     <div className="app-container">
       <h1>Lista Politici</h1>
       
        <input  
          type="text"
          placeholder="Cerca per nome o biografia"
          value={search}
          onChange={handleSearchChange}
        />


         {renderPoliticiansList()}
     </div>

  )
}

export default App
