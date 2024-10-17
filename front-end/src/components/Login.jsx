export default function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form action="" method="post" className="login-form">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" required></input>
        <label for="password">Password</label>
        <input id="password" type="text" name="password" required></input>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
