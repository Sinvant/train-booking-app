import React from 'react'
import trains from '../data/trains'
import { Link } from 'react-router-dom'

export default function TrainList(){
  return (
    <div>
      <div className="hero">
        <div>
          <div className="lead">Find and book trains across India</div>
          <div className="sub">Quickly search schedules, choose seats, and confirm bookings.</div>
        </div>
        <div className="badge">Instant Booking</div>
      </div>

      <h2 style={{marginTop:8}}>Available Trains</h2>
      <div className="train-list">
        {trains.map(t=> {
          const available = t.seats.filter(s=>!s.booked).length
          return (
            <div className="card" key={t.id}>
              <div className="top">
                <div>
                  <div style={{fontWeight:800,fontSize:16}}>{t.name} <span style={{fontWeight:600,color:'#374151'}}>— {t.id}</span></div>
                  <div className="meta">{t.from} → {t.to}</div>
                </div>

                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700}}>{t.departure} → {t.arrival}</div>
                  <div className="meta">{t.duration}</div>
                </div>
              </div>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
                <div className="availability">{available} seats available</div>
                <div className="actions">
                  <Link to={`/train/${t.id}`}><button>View & Book</button></Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
