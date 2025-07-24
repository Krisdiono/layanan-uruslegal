import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://uruslegal.id/wp-json/uruslegal/v1/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setFiltered(
      services.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, services]);

  return (
    <div className="container">
      <h1>Layanan UrusLegal.id</h1>
      <input
        type="text"
        placeholder="Cari layanan..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="card-list">
        {filtered.map((s, i) => (
          <div className="card" key={i}>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
