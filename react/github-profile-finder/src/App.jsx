import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import RepoList from "./components/RepoList.jsx";
import { useDebounce } from "./hooks/useDebounce.js";
import { getProfile } from "./api.js";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Wait until the user stops typing for 500 ms
  const username = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (!username) {
      setProfile(null);
      setError("");
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");

    getProfile(username, controller.signal)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // an older search was cancelled
        setProfile(null);
        setError(err.message);
        setLoading(false);
      });

    // New username typed → cancel the previous request
    return () => controller.abort();
  }, [username]);

  return (
    <div className="app">
      <div className="finder">
        <h1>GitHub Profile Finder</h1>
        <p className="subtitle">Type a username. Results appear as you type.</p>

        <SearchBar value={query} onChange={setQuery} />

        {loading && <div className="spinner"></div>}
        {error && <p className="error">⚠️ {error}</p>}
        {profile && !loading && (
          <>
            <ProfileCard user={profile.user} />
            <RepoList repos={profile.repos} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
