
import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { api } from './api';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal'
];

const CATEGORIES = [
  'Income support',
  'Crop insurance',
  'Soil health',
  'Irrigation',
  'Training and extension',
  'Farm machinery',
  'Water conservation',
  'Horticulture',
  'Farm infrastructure'
];

// NAVIGATION
function Nav({ user, onLogout }) {
  return (
    <header className="topbar">
      <Link className="brand" to="/">🌱 AgriMatch</Link>

      <nav>
        <Link to="/schemes">Scheme directory</Link>

        {user && (
          <>
            <Link to="/profile">Farmer profile</Link>
            <Link to="/matches">My matches</Link>
          </>
        )}

        {user ? (
          <button className="link-button" onClick={onLogout}>
            Log out
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

// HOME PAGE
function Home() {
  return (
    <main className="hero">
      <section className="hero-copy">
        <span className="eyebrow">FARMER-FIRST SCHEME DISCOVERY</span>

        <h1>
          Find support that fits <em>your farm.</em>
        </h1>

        <p>
          Explore Central and State Government agriculture schemes,
          understand their purpose and find official information in one place.
        </p>

        <div className="actions">
          <Link className="btn" to="/register">
            Create account
          </Link>

          <Link className="btn secondary" to="/schemes">
            Explore schemes
          </Link>
        </div>

        <p className="notice">
          Student project. Suggestions are informational only and do not
          confirm eligibility or approval.
        </p>
      </section>

      <div className="hero-art">
        <div className="sun" />
        <div className="field field-one" />
        <div className="field field-two" />
        <div className="field field-three" />

        <div className="art-label">
          Better information.
          <br />
          Stronger farms.
        </div>
      </div>

      <section className="feature-row">
        <article>
          <b>01</b>
          <h3>Create a farmer profile</h3>
          <p>Choose your state, district, crops and farm details.</p>
        </article>

        <article>
          <b>02</b>
          <h3>Explore schemes</h3>
          <p>Filter Central and State schemes by category and location.</p>
        </article>

        <article>
          <b>03</b>
          <h3>Understand next steps</h3>
          <p>Read matching reasons and open official government sources.</p>
        </article>
      </section>
    </main>
  );
}

// LOGIN AND REGISTER
function AuthPage({ mode, onAuth }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const data = await api(`/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify(form)
      });

      localStorage.setItem('agrimatch_token', data.token);
      onAuth(data.user);
      nav('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="narrow">
      <div className="panel">
        <span className="eyebrow">WELCOME TO AGRIMATCH</span>

        <h1>
          {mode === 'register' ? 'Create your account' : 'Welcome back'}
        </h1>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <label>
              Full name
              <input
                required
                minLength="2"
                maxLength="80"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </label>
          )}

          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </label>

          <label>
            Password
            <input
              required
              minLength="8"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button className="btn full" disabled={busy}>
            {busy
              ? 'Please wait…'
              : mode === 'register'
                ? 'Create account'
                : 'Login'}
          </button>
        </form>

        <p className="muted">
          {mode === 'register'
            ? 'Already registered? '
            : 'New to AgriMatch? '}

          <Link to={mode === 'register' ? '/login' : '/register'}>
            {mode === 'register' ? 'Login' : 'Create an account'}
          </Link>
        </p>
      </div>
    </main>
  );
}

// FARMER PROFILE
function Profile({ user }) {
  const [form, setForm] = useState({
    state: 'Madhya Pradesh',
    district: '',
    landSizeAcres: '',
    farmerType: 'small',
    irrigation: 'partial',
    crops: '',
    interests: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api('/profile')
      .then(({ profile }) => {
        if (profile) {
          setForm({
            ...profile,
            landSizeAcres: String(profile.landSizeAcres ?? ''),
            crops: (profile.crops || []).join(', '),
            interests: (profile.interests || []).join(', ')
          });
        }
      })
      .catch((e) => setError(e.message));
  }, []);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api('/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          landSizeAcres: Number(form.landSizeAcres),
          crops: form.crops
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          interests: form.interests
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        })
      });

      setMessage('Profile saved. Open My matches to see suggestions.');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="narrow">
      <div className="panel">
        <span className="eyebrow">FARMER PROFILE</span>
        <h1>Tell us about your farm</h1>

        <p className="muted">
          Welcome, {user?.name || 'farmer'}. Only enter information
          needed for this student-project demo.
        </p>

        <form onSubmit={submit} className="form-grid">
          <label>
            State
            <select
              required
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
            >
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label>
            District
            <input
              value={form.district}
              onChange={(e) => update('district', e.target.value)}
              placeholder="e.g. Bhopal"
            />
          </label>

          <label>
            Landholding (acres)
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.landSizeAcres}
              onChange={(e) => update('landSizeAcres', e.target.value)}
            />
          </label>

          <label>
            Farmer type
            <select
              value={form.farmerType}
              onChange={(e) => update('farmerType', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="marginal">Marginal</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Irrigation
            <select
              value={form.irrigation}
              onChange={(e) => update('irrigation', e.target.value)}
            >
              <option value="partial">Partial</option>
              <option value="yes">Available</option>
              <option value="no">Not available</option>
            </select>
          </label>

          <label>
            Crops (comma separated)
            <input
              value={form.crops}
              onChange={(e) => update('crops', e.target.value)}
              placeholder="Wheat, soybean"
            />
          </label>

          <label className="span-two">
            Interests (comma separated)
            <input
              value={form.interests}
              onChange={(e) => update('interests', e.target.value)}
              placeholder="Irrigation, crop insurance, machinery"
            />
          </label>

          <div className="span-two">
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <button className="btn">Save farmer profile</button>
          </div>
        </form>

        <p className="notice">
          Do not enter Aadhaar numbers, bank-account details or other
          sensitive identifiers.
        </p>
      </div>
    </main>
  );
}

// SCHEME DIRECTORY
function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    level: '',
    state: '',
    category: '',
    q: ''
  });

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    );

    setLoading(true);
    setError('');

    api(`/schemes?${params.toString()}`)
      .then((data) => {
        if (!cancelled) {
          setSchemes(data.schemes || []);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(error.message);
          setSchemes([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filters]);

  const set = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  return (
    <main className="content">
      <span className="eyebrow">OFFICIAL-SOURCE SCHEME DIRECTORY</span>

      <h1>Explore government schemes</h1>

      <p className="muted">
        Browse the starter catalogue. The project is designed to
        expand state by state.
      </p>

      <div className="filter-bar">
        <input
          aria-label="Search schemes"
          placeholder="Search by scheme, benefit or topic"
          value={filters.q}
          onChange={(e) => set('q', e.target.value)}
        />

        <select
          aria-label="Government level"
          value={filters.level}
          onChange={(e) => set('level', e.target.value)}
        >
          <option value="">All government levels</option>
          <option value="Central">Central</option>
          <option value="State">State</option>
        </select>

        <select
          aria-label="State"
          value={filters.state}
          onChange={(e) => set('state', e.target.value)}
        >
          <option value="">All states</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          aria-label="Category"
          value={filters.category}
          onChange={(e) => set('category', e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          className="btn secondary"
          onClick={() =>
            setFilters({ level: '', state: '', category: '', q: '' })
          }
        >
          Clear
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="muted">Loading schemes…</p>
      ) : (
        <>
          <p className="result-count">
            {schemes.length} scheme record(s) found
          </p>

          <div className="cards">
            {schemes.map((s) => (
              <SchemeCard key={s._id} scheme={s} />
            ))}
          </div>

          {schemes.length === 0 && !error && (
            <p className="muted">
              No schemes found for these filters. Try selecting
              another state or category.
            </p>
          )}
        </>
      )}
    </main>
  );
}

// REUSABLE SCHEME CARD
function SchemeCard({ scheme, match }) {
  return (
    <article className="scheme-card">
      <div className="card-tags">
        <span className="tag">{scheme.governmentLevel} government</span>
        <span className="tag neutral">{scheme.category}</span>
      </div>

      <h3>{scheme.name}</h3>
      <p>{scheme.summary}</p>
      <strong>{scheme.benefit}</strong>

      <p className="muted">
        <b>Applicable:</b> {scheme.applicableStates?.join(', ')}
      </p>

      {match && (
        <>
          <h4>{match.matchLabel}</h4>

          <ul>
            {(match.reasons || []).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          {match.caveats?.length > 0 && (
            <details>
              <summary>Important checks before applying</summary>
              <ul>
                {match.caveats.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </details>
          )}
        </>
      )}

      {scheme.lastVerifiedAt && (
        <p className="source-line">
          Source checked:{' '}
          {new Date(scheme.lastVerifiedAt).toLocaleDateString('en-IN')}
          {' · '}
          {scheme.sourceName}
        </p>
      )}

      {scheme.officialUrl && (
        <a href={scheme.officialUrl} target="_blank" rel="noreferrer">
          Open official scheme portal ↗
        </a>
      )}

      {scheme.verificationStatus === 'needs-recheck' && (
        <p className="notice">
          Please verify current eligibility and benefits with the
          official department.
        </p>
      )}
    </article>
  );
}

// MATCH SUGGESTIONS
function Matches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [disclaimer, setDisclaimer] = useState('');

  useEffect(() => {
    api('/matches')
      .then((d) => {
        setMatches(d.matches || []);
        setDisclaimer(d.disclaimer || '');
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="content">
      <span className="eyebrow">PERSONALISED DISCOVERY</span>

      <h1>Scheme suggestions</h1>

      <p className="notice">
        {disclaimer ||
          'These suggestions are informational only. Confirm all details with the official department.'}
      </p>

      {error && (
        <div className="panel">
          <p className="error">{error}</p>
          <Link className="btn" to="/profile">
            Complete profile
          </Link>
        </div>
      )}

      <div className="cards">
        {matches.map((m) => (
          <SchemeCard
            key={m.scheme._id}
            scheme={m.scheme}
            match={m}
          />
        ))}
      </div>

      {!error && matches.length === 0 && (
        <p className="muted">
          No suggestions available yet. Complete your farmer profile
          to see scheme suggestions.
        </p>
      )}
    </main>
  );
}

// MAIN APP
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('agrimatch_token')) {
      api('/auth/me')
        .then((d) => setUser(d.user))
        .catch(() => localStorage.removeItem('agrimatch_token'))
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('agrimatch_token');
    setUser(null);
  };

  if (checking) {
    return <div className="loading">Loading AgriMatch…</div>;
  }

  return (
    <>
      <Nav user={user} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={<AuthPage mode="register" onAuth={setUser} />}
        />

        <Route
          path="/login"
          element={<AuthPage mode="login" onAuth={setUser} />}
        />

        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/matches"
          element={user ? <Matches /> : <Navigate to="/login" />}
        />

        <Route path="/schemes" element={<Schemes />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <footer>
        AgriMatch · B.Tech CSE assignment project · Always verify
        details with official government sources
      </footer>
    </>
  );
}
