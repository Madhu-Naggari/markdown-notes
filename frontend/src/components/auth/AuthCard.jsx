function AuthCard({
  authForm,
  authLoading,
  authMode,
  onAuthInputChange,
  onAuthModeChange,
  onSubmit,
}) {
  return (
    <section className="auth-card shadow-sm">
      <div className="auth-header">
        <h2>{authMode === "login" ? "Welcome back" : "Create account"}</h2>
        <p>
          {authMode === "login"
            ? "Sign in to access your notes."
            : "Create your account to start saving notes."}
        </p>
      </div>

      <div className="auth-switch">
        <button
          className={`switch-button ${authMode === "login" ? "active-switch" : ""}`}
          onClick={() => onAuthModeChange("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={`switch-button ${
            authMode === "register" ? "active-switch" : ""
          }`}
          onClick={() => onAuthModeChange("register")}
          type="button"
        >
          Register
        </button>
      </div>

      <form className="auth-form" onSubmit={onSubmit}>
        {authMode === "register" && (
          <input
            className="title-input"
            type="text"
            name="name"
            placeholder="Full name"
            value={authForm.name}
            onChange={onAuthInputChange}
          />
        )}

        <input
          className="title-input"
          type="email"
          name="email"
          placeholder="Email address"
          value={authForm.email}
          onChange={onAuthInputChange}
        />

        <input
          className="title-input"
          type="password"
          name="password"
          placeholder="Password"
          value={authForm.password}
          onChange={onAuthInputChange}
        />

        <button
          className="primary-button hover-shadow-md auth-submit"
          disabled={authLoading}
          type="submit"
        >
          {authLoading
            ? "Please wait..."
            : authMode === "login"
              ? "Login"
              : "Create Account"}
        </button>
      </form>
    </section>
  );
}

export default AuthCard;

