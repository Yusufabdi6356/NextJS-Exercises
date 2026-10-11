type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
};

export async function fetchUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

  if (!res.ok) {
    return {
      name: username,
      bio: "User not found.",
    };
  }

  const user: GithubUser = await res.json();

  return {
    name: user.name || user.login,
    bio: user.bio || "No bio yet.",
  };
}
