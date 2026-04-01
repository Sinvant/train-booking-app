import React, {useState, useMemo} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import trains from '../data/trains'
import SeatSelector from './SeatSelector'

const FARE_BY_CLASS = { 'Sleeper': 250, '3A': 650, '2A': 1200, '1A': 2200 }

export default function TrainDetails(){
  const { id } = useParams()
  const train = trains.find(t=>t.id === id)
  const [selected, setSelected] = useState([])
  const [travelClass, setTravelClass] = useState('Sleeper')
  const navigate = useNavigate()

  if(!train) return <div className="card">Train not found</div>

  function toggle(seatNo){
    setSelected(prev => prev.includes(seatNo) ? prev.filter(x=>x!==seatNo) : [...prev,seatNo])
  }

  const farePerSeat = FARE_BY_CLASS[travelClass] || 250
  const totalFare = useMemo(()=> selected.length * farePerSeat, [selected, farePerSeat])

  function proceed(){
    if(selected.length===0){alert('Select at least one seat');return}
    navigate('/booking', {state:{trainId:train.id, selected, travelClass, totalFare}})
  }

  return (
    <div>
      <h2>{train.name} — {train.id}</h2>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <div>
            <div style={{fontWeight:700}}>{train.from} → {train.to}</div>
            <div className="meta" style={{marginTop:6}}>{train.departure} • {train.arrival} • {train.duration}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="badge">{train.id}</div>
            <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>{train.seats.filter(s=>!s.booked).length} seats left</div>
          </div>
        </div>
      </div>

      <div style={{display:'flex',gap:16,marginTop:14}}>
        <div style={{flex:1}}>
          <h3 style={{marginTop:0}}>Choose Seats</h3>
          <SeatSelector seats={train.seats} selected={selected} onToggle={toggle} />
        </div>

        <aside style={{width:320}}>
          <div className="card">
            <div style={{fontWeight:700}}>Booking Summary</div>
            <div className="meta" style={{marginTop:8}}>Class</div>
            <select value={travelClass} onChange={e=>setTravelClass(e.target.value)} style={{width:'100%',marginTop:8}}>
              <option>Sleeper</option>
              <option>3A</option>
              <option>2A</option>
              <option>1A</option>
            </select>

            <div style={{marginTop:12}}>
              <div className="meta">Seats selected</div>
              <div style={{fontWeight:700,marginTop:6}}>{selected.length ? selected.join(', ') : '—'}</div>
            </div>

            <div style={{marginTop:12}}>
              <div className="meta">Fare per seat</div>
              <div style={{fontWeight:800,marginTop:6}}>₹{farePerSeat.toLocaleString()}</div>
            </div>

            <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div className="meta">Total</div>
              <div style={{fontWeight:900,fontSize:18}}>₹{totalFare.toLocaleString()}</div>
            </div>

            <div className="actions" style={{marginTop:14}}>
              <button onClick={proceed}>Proceed to Booking</button>
              <button className="secondary" style={{marginLeft:8}} onClick={()=>setSelected([])}>Clear</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
