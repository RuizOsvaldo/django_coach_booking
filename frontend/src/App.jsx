import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/">Calendar</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/testimonials">Testimonials</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
