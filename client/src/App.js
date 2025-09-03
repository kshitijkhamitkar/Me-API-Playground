
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // const API_BASE = "http://localhost:4000/api/profile"; // change to hosted URL later
// const API_BASE = process.env.REACT_APP_API_URL + "/api/profile";

// function App() {
//   const [profile, setProfile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [searchSkill, setSearchSkill] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_BASE}/`);
//         setProfile(data);
//       } catch (err) {
//         console.error("Error fetching profile:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Search projects by skill
//   const handleSearch = async () => {
//     if (!searchSkill.trim()) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/projects`, {
//         params: { skill: searchSkill }
//       });
//       setProjects(data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Global search across profile
//   const handleGlobalSearch = async () => {
//     if (!searchSkill.trim()) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/search`, {
//         params: { q: searchSkill }
//       });
//       setSearchResults([data]);
//     } catch (err) {
//       console.error("Error in global search:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>My Profile</h1>

//       {loading && <p>Loading...</p>}

//       {profile ? (
//         <div>
//           <p><b>Name:</b> {profile.name}</p>
//           <p><b>Email:</b> {profile.email}</p>
//           <p><b>Bio:</b> {profile.bio}</p>
//           <p><b>Skills:</b> {profile.skills?.join(", ")}</p>
//         </div>
//       ) : (
//         !loading && <p>No profile found.</p>
//       )}

//       <hr />

//       <h2>Search Projects by Skill</h2>
//       <input
//         type="text"
//         value={searchSkill}
//         onChange={e => setSearchSkill(e.target.value)}
//         placeholder="Enter skill (e.g., React)"
//       />
//       <button onClick={handleSearch}>Search</button>

//       <ul>
//         {projects.length > 0 ? (
//           projects.map((p, i) => (
//             <li key={i}>
//               <b>{p.title}</b> - {p.description}
//             </li>
//           ))
//         ) : (
//           !loading && <p>No projects found.</p>
//         )}
//       </ul>

//       <hr />

//       <h2>Global Search</h2>
//       <button onClick={handleGlobalSearch}>Search Profile</button>
//       {searchResults.length > 0 && (
//         <pre>{JSON.stringify(searchResults, null, 2)}</pre>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const API_BASE = https://me-api-playground-1-a8vn.onrender.com/api/profile    
// process.env.REACT_APP_API_URL + "/api/profile";

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
        params: { skill: searchSkill },
      });
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Global search
  const handleGlobalSearch = async () => {
    if (!searchSkill.trim()) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/search`, {
        params: { q: searchSkill },
      });
      setSearchResults([data]);
    } catch (err) {
      console.error("Error in global search:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">My Portfolio</h1>

        {loading && <p className="text-blue-500">Loading...</p>}

        {/* Profile Section */}
        {profile ? (
          <div className="mb-6">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
          </div>
        ) : (
          !loading && <p className="text-gray-500">No profile found.</p>
        )}

        <hr className="my-6" />

        {/* Project Search */}
        <h2 className="text-xl font-semibold mb-2">Search Projects by Skill</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            placeholder="Enter skill (e.g., React)"
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button
            onClick={handleSearch}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
        </div>

        <ul className="space-y-2">
          {projects.length > 0 ? (
            projects.map((p, i) => (
              <li key={i} className="border p-3 rounded-lg bg-gray-100">
                <strong>{p.title}</strong> - {p.description}
              </li>
            ))
          ) : (
            !loading && <p className="text-gray-500">No projects found.</p>
          )}
        </ul>

        <hr className="my-6" />

        {/* Global Search */}
        <h2 className="text-xl font-semibold mb-2">Global Search</h2>
        <button
          onClick={handleGlobalSearch}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Search Profile
        </button>

        {searchResults.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(searchResults, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // const API_BASE = "http://localhost:4000/api/profile"; // change to hosted URL later
// const API_BASE = process.env.REACT_APP_API_URL + "/api/profile";

// function App() {
//   const [profile, setProfile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [searchSkill, setSearchSkill] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_BASE}/`);
//         setProfile(data);
//       } catch (err) {
//         console.error("Error fetching profile:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Search projects by skill
//   const handleSearch = async () => {
//     if (!searchSkill.trim()) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/projects`, {
//         params: { skill: searchSkill }
//       });
//       setProjects(data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Global search across profile
//   const handleGlobalSearch = async () => {
//     if (!searchSkill.trim()) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${API_BASE}/search`, {
//         params: { q: searchSkill }
//       });
//       setSearchResults([data]);
//     } catch (err) {
//       console.error("Error in global search:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>My Profile</h1>

//       {loading && <p>Loading...</p>}

//       {profile ? (
//         <div>
//           <p><b>Name:</b> {profile.name}</p>
//           <p><b>Email:</b> {profile.email}</p>
//           <p><b>Bio:</b> {profile.bio}</p>
//           <p><b>Skills:</b> {profile.skills?.join(", ")}</p>
//         </div>
//       ) : (
//         !loading && <p>No profile found.</p>
//       )}

//       <hr />

//       <h2>Search Projects by Skill</h2>
//       <input
//         type="text"
//         value={searchSkill}
//         onChange={e => setSearchSkill(e.target.value)}
//         placeholder="Enter skill (e.g., React)"
//       />
//       <button onClick={handleSearch}>Search</button>

//       <ul>
//         {projects.length > 0 ? (
//           projects.map((p, i) => (
//             <li key={i}>
//               <b>{p.title}</b> - {p.description}
//             </li>
//           ))
//         ) : (
//           !loading && <p>No projects found.</p>
//         )}
//       </ul>

//       <hr />

//       <h2>Global Search</h2>
//       <button onClick={handleGlobalSearch}>Search Profile</button>
//       {searchResults.length > 0 && (
//         <pre>{JSON.stringify(searchResults, null, 2)}</pre>
//       )}
//     </div>
//   );
// }

// export default App;

