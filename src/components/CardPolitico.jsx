// Componente per mostrare un singolo politico 

function cardPolitico ({name, image, position, biography }) {
    
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <h4>{position}</h4>
            <p>{biography}</p>

        </div>
    );
}

export default cardPolitico;