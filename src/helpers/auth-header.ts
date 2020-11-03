export function authHeader() {
  // return authorization header with jwt token
  const localUser = localStorage.getItem("user");
  const user = JSON.parse(localUser || "{}");

  if (localUser && user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
