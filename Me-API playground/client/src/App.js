import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000/api/profile"; // change to hosted URL later

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Search projects by skill
  const handleSearch = async () => {
    if (!searchSkill.trim()) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/projects`, {
        params: { skill: searchSkill }
      });
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Global search across profile
  const handleGlobalSearch = async () => {
    if (!searchSkill.trim()) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/search`, {
        params: { q: searchSkill }
      });
      setSearchResults([data]);
    } catch (err) {
      console.error("Error in global search:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Profile</h1>

      {loading && <p>Loading...</p>}

      {profile ? (
        <div>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Bio:</b> {profile.bio}</p>
          <p><b>Skills:</b> {profile.skills?.join(", ")}</p>
        </div>
      ) : (
        !loading && <p>No profile found.</p>
      )}

      <hr />

      <h2>Search Projects by Skill</h2>
      <input
        type="text"
        value={searchSkill}
        onChange={e => setSearchSkill(e.target.value)}
        placeholder="Enter skill (e.g., React)"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {projects.length > 0 ? (
          projects.map((p, i) => (
            <li key={i}>
              <b>{p.title}</b> - {p.description}
            </li>
          ))
        ) : (
          !loading && <p>No projects found.</p>
        )}
      </ul>

      <hr />

      <h2>Global Search</h2>
      <button onClick={handleGlobalSearch}>Search Profile</button>
      {searchResults.length > 0 && (
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
