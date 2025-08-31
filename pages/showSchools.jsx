import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/getSchools").then((res) => setSchools(res.data));
  }, []);

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <header className="navbar">
        <h1>🏫 School Directory</h1>
        <nav>
          <a href="/addSchool">Add School</a>
          <a href="/showSchools">Show Schools</a>
        </nav>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <main className="grid-container">
        {filteredSchools.map((school) => (
          <div key={school.id} className="card glass">
            <img src={school.image} alt={school.name} />
            <h3>{school.name}</h3>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
