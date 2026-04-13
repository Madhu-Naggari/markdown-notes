import AuthCard from "../components/auth/AuthCard";
import AppHeader from "../components/layout/AppHeader";

function AuthPage(props) {
  const {
    appName,
    authForm,
    authLoading,
    authMode,
    onAuthInputChange,
    onAuthModeChange,
    onSubmit,
    onThemeToggle,
    theme,
  } = props;

  return (
    <div className="app-shell auth-shell">
      <AppHeader
        description="Write notes, preview Markdown, and keep everything secure."
        onThemeToggle={onThemeToggle}
        theme={theme}
        title={appName}
      />

      <main className="auth-layout">
        <AuthCard
          authForm={authForm}
          authLoading={authLoading}
          authMode={authMode}
          onAuthInputChange={onAuthInputChange}
          onAuthModeChange={onAuthModeChange}
          onSubmit={onSubmit}
        />
      </main>
    </div>
  );
}

export default AuthPage;

