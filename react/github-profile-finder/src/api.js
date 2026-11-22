const BASE_URL = "https://api.github.com";

async function fetchGitHub(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });

  if (res.status === 404) {
    throw new Error("User not found");
  }
  if (res.status === 403 || res.status === 429) {
    throw new Error("Rate limit reached. Try again in a few minutes.");
  }
  if (!res.ok) {
    throw new Error("Something went wrong. Try again!");
  }
  return res.json();
}

export async function getProfile(username, signal) {
  const name = encodeURIComponent(username);

  // Both requests start together, so we wait for the slower one only
  const [user, repos] = await Promise.all([
    fetchGitHub(`/users/${name}`, signal),
    fetchGitHub(`/users/${name}/repos?sort=updated&per_page=5`, signal),
  ]);

  return { user, repos };
}
