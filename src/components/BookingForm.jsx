import React, {useState, useMemo} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import trains from '../data/trains'

const FARE_BY_CLASS = { 'Sleeper': 250, '3A': 650, '2A': 1200, '1A': 2200 }

export default function BookingForm(){
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state || {}
  const { trainId, selected = [], travelClass = 'Sleeper', totalFare } = state
  const train = trains.find(t=>t.id === trainId)

  const [form, setForm] = useState({name:'',age:'',phone:''})

  if(!train) return <div className="card">Invalid booking. Go back to <a href="/">home</a>.</div>

  const farePerSeat = FARE_BY_CLASS[travelClass] || 250
  const computedTotal = useMemo(()=> selected.length * farePerSeat, [selected, farePerSeat])

  function handleSubmit(e){
    e.preventDefault()
    if(!form.name || !form.age) { alert('Please enter passenger name and age'); return }
    const bookingId = 'PNR' + Math.floor(100000 + Math.random()*900000)
    const booking = {
      bookingId,
      trainId:train.id,
      trainName:train.name,
      seats:selected,
      passenger:form,
      travelClass,
      amount: totalFare || computedTotal,
      createdAt: new Date().toISOString()
    }
    navigate('/confirmation', {state:{booking}})
  }

  return (
    <div>
      <h2>Booking — {train.name}</h2>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
            <div className="meta">Seats</div>
            <div style={{fontWeight:800}}>{selected.length ? selected.join(', ') : '—'}</div>
          </div>
          <div>
            <div className="meta">Class</div>
            <div style={{fontWeight:800}}>{travelClass}</div>
          </div>
          <div>
            <div className="meta">Amount</div>
            <div style={{fontWeight:900,fontSize:16}}>₹{(totalFare || computedTotal).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{marginTop:12,display:'grid',gap:8,maxWidth:560}}>
        <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Age" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} required />
        <input placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />

        <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
          <button type="submit">Confirm & Pay</button>
          <button type="button" className="secondary" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  )
}
