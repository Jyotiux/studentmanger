import React, { useEffect, useState } from 'react'

export default function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch('/students')
      setStudents(await res.json())
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const validateClient = () => {
    const errs = {}
    if (!form.firstName || !form.firstName.trim()) errs.firstName = 'First is required'
    if (!form.lastName || !form.lastName.trim()) errs.lastName = 'Last is required'
    if (!form.email || !form.email.trim()) errs.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Email is not valid'
    return errs
  }

  const add = async () => {
    const clientErrs = validateClient()
    if (Object.keys(clientErrs).length) { setErrors(clientErrs); return }
    setErrors(null)

    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.status === 400) {
      const serverErrs = await res.json()
      setErrors(serverErrs)
      return
    }

    setForm({ firstName: '', lastName: '', email: '' })
    setErrors(null)
    load()
  }

  const del = async (id) => {
    await fetch(`/students/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="app">
      <h1>Students</h1>
      <div className="grid">
        <div className="left">
          {loading ? <div>Loading...</div> : (
            <table>
              <thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Action</th></tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.email}</td>
                    <td><button className="del" onClick={() => del(s.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="right">
          <h3>Add Student</h3>
          <div className="field"><label>First</label><input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
          <div className="field"><label>Last</label><input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
          <div className="field"><label>Email</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>

          {errors && Object.entries(errors).map(([k,v]) => <div key={k} className="err">{k}: {v}</div>)}

          <div style={{marginTop:8}}>
            <button onClick={add}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
