// App.jsx
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({ name: "", age: "", place: "" });
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const trimmedName = form.name.trim();
    const trimmedPlace = form.place.trim();
    const ageVal = form.age.trim();

    if (!trimmedName || !ageVal || !trimmedPlace) {
      setError("All fields are required");
      return;
    }

    // Basic age validation
    if (!/^[0-9]+$/.test(ageVal)) {
      setError("Age must be a number");
      return;
    }

    setRows((r) => [...r, { name: trimmedName, age: ageVal, place: trimmedPlace }]);
    setForm({ name: "", age: "", place: "" });
  };

  return (
    <div className="app-root">
      <h1 className="title">Add People to Table</h1>
      <p className="subtitle">Enter Place, Name and Age, then click Add.</p>

      <form className="input-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="place">Place</label>
          <input
            id="place"
            name="place"
            value={form.place}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Akash"
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g. 24"
            autoComplete="off"
          />
        </div>

        <div className="actions">
          <button type="submit" className="add-btn">Add</button>
        </div>

        {error && <div className="error">{error}</div>}
      </form>

      <div className="table-wrap">
        <table className="data-table" data-testid="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={3}>No data yet</td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.name}</td>
                  <td>{r.age}</td>
                  <td>{r.place}</td>
                  <td>
                    <button className="remove-btn" onClick={() => setRows(rows.filter((_, i) => i !== idx))}>
                    Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
          <small className="notes">No entries yet. Add your first row!</small>
    </div>
  );
}