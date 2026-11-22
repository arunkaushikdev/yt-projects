function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="empty">No public repositories yet.</p>;
  }

  return (
    <div className="repo-list">
      <h3>Latest repositories</h3>
      {repos.map((repo) => (
        <a
          key={repo.id}
          className="repo"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <span className="repo-name">{repo.name}</span>
          <span className="repo-meta">
            {repo.language && <span>{repo.language}</span>}
            <span>⭐ {repo.stargazers_count}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default RepoList;
