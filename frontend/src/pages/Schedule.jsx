import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Schedule() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [successMsg, setSuccessMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/book/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSuccessMsg('Booking submitted! Check your calendar soon.')
        setFormData({ name: '', email: '', phone: '' })
      } else {
        alert('Something went wrong.')
      }
    } catch (err) {
      console.error(err)
      alert('Error connecting to the server.')
    }
  }

  return (
    <div>
      <h1>Schedule a Lesson</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[]} // Future: Pull from API
      />

      <h2>Book a Session</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Submit Booking</button>
      </form>

      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  )
}
