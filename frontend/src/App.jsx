import React, { useEffect, useState } from 'react'

export default function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })

  const load = async () => {
    try {
      const res = await fetch('/students')
      setStudents(await res.json())
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.firstName || !form.lastName || !form.email) return alert('Fill all fields')
    await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ firstName: '', lastName: '', email: '' })
    load()
  }

  const del = async (id) => {
    await fetch(`/students/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="container">
      <h1>Students</h1>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.id}: {s.firstName} {s.lastName} ({s.email})
            <button className="del" onClick={() => del(s.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Student</h3>
      <div className="form">
        <input placeholder="First" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button onClick={add}>Add</button>
      </div>
    </div>
  )
}
