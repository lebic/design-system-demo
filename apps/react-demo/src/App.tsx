import { useState } from 'react';
import { Button, Checkbox, Input, Select } from '@design-system/react';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [framework, setFramework] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleDark = () => {
    setDarkMode((d) => !d);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          ⚛️ React Design System Demo
        </h1>
        <Button intent="ghost" onClick={toggleDark}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </Button>
      </header>

      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {/* Button variants */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Buttons
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Button intent="primary">Primary</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="success">Success</Button>
            <Button intent="warning">Warning</Button>
            <Button intent="danger">Danger</Button>
            <Button intent="ghost">Ghost</Button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button isLoading={loading} onClick={handleSubmit}>
              {loading ? 'Loading…' : 'Click to load'}
            </Button>
          </div>
        </section>

        {/* Input */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Input
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="We'll never share your email."
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              errorMessage="Password is too short."
            />
            <Input
              label="Success state"
              defaultValue="Valid input"
              variant="success"
            />
          </div>
        </section>

        {/* Select */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Select
          </h2>
          <div style={{ maxWidth: '400px' }}>
            <Select
              label="Favorite framework"
              options={frameworks}
              placeholder="Choose a framework…"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              helperText="Pick your favorite JavaScript framework."
            />
          </div>
        </section>

        {/* Checkbox */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Checkbox
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox
              label="I agree to the terms and conditions"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <Checkbox
              label="Subscribe to newsletter"
              helperText="You can unsubscribe at any time."
            />
            <Checkbox label="Indeterminate state" indeterminate />
            <Checkbox label="Disabled checkbox" disabled />
          </div>
        </section>
      </main>
    </div>
  );
}
