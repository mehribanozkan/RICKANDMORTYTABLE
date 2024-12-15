import React, { useEffect, useState } from "react";
import { getCharacters } from "../api";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters(); // API'den verileri al
        setCharacters(data.results); // Verileri state'e aktar
      } catch (err) {
        setError("Veriler alınırken bir hata oluştu!");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;