import React, { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import { UserCheck, UserX, Loader2 } from 'lucide-react';
import './index.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Usuario() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Registro exitoso. Revisa tu correo para validar la cuenta.', type: 'success' });
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Has iniciado sesión correctamente.', type: 'success' });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setSession(null);
      setEmail('');
      setPassword('');
      setMessage({ text: 'Sesión cerrada correctamente.', type: 'success' });
    }
  };

  if (session) {
    return (
      <div className="usuario-card">
        <div className="usuario-header">
          <div className="usuario-status usuario-status--online">
            <UserCheck size={28} />
          </div>
          <div className="usuario-heading">
            <h2>Bienvenido</h2>
            <p>{session.user.email}</p>
          </div>
        </div>

        <div className="usuario-body">
          <p className="usuario-tip">Tu sesión está activa y conectada a Supabase.</p>
          <button
            className="usuario-btn usuario-btn--danger"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <Loader2 className="loader" size={18} /> : 'Cerrar sesión'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="usuario-card">
      <div className="usuario-header">
        <div className="usuario-status usuario-status--offline">
          <UserX size={28} />
        </div>
        <div className="usuario-heading">
          <h2>Acceso de usuario</h2>
          <p>Inicia sesión o crea una cuenta para seguir.</p>
        </div>
      </div>

      <form className="usuario-form" onSubmit={handleLogin}>
        <div className="usuario-field">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="usuario-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {message && (
          <div className={`usuario-message usuario-message--${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="usuario-actions">
          <button
            type="submit"
            className="usuario-btn usuario-btn--primary"
            disabled={loading || !email || !password}
          >
            {loading ? <Loader2 className="loader" size={18} /> : 'Iniciar sesión'}
          </button>
          <button
            type="button"
            className="usuario-btn usuario-btn--secondary"
            onClick={handleSignUp}
            disabled={loading || !email || !password}
          >
            {loading ? <Loader2 className="loader" size={18} /> : 'Registrarse'}
          </button>
        </div>
      </form>
    </div>
  );
}
