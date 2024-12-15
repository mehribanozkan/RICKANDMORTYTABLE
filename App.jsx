import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getCharacters } from "./api"; // API fonksiyonunuzu import edin.
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakterler
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Arama kutusu değeri

  // API'den veri çek
  const fetchData = async (page) => {
    try {
      const data = await getCharacters(page);
      setCharacters(data.results);
      setFilteredCharacters(data.results); // İlk başta tüm verileri göster
      setPageCount(data.info.pages);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  // Sayfa değişince veri çek
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Arama kutusu değeri değiştiğinde filtrele
  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) // İsme göre filtrele
    );
    setFilteredCharacters(filtered);
  }, [searchQuery, characters]);

  // Sayfa değiştirildiğinde çalışan fonksiyon
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="App">
      <h1>Rick and Morty Karakterleri</h1>

      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Karakter adı ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      {/* Tablo Görünümü */}
      <div className="character-table">
        <table>
          <thead>
            <tr>
              <th>Fotoğraf</th>
              <th>İsim</th>
              <th>Durum</th>
              <th>Tür</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharacters.map((character) => (
              <tr key={character.id}>
                <td>
                  <img src={character.image} alt={character.name} className="character-table-image" />
                </td>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* React-Paginate bileşeni */}
      <ReactPaginate
        previousLabel={"Geri"}
        nextLabel={"İleri"}
        breakLabel={"---"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default App;
