const trains = [
  {
    _id: '12345',
    trainName: 'Rajdhani Express',
    source: 'New Delhi (NDLS)',
    destination: 'Mumbai Central (BCT)',
    duration: '16h 30m',
    departure: '20:00',
    arrival: '12:30',
    seats: generateSeats(80)
  },
  {
    _id: '54321',
    trainName: 'Shatabdi Express',
    source: 'Chennai Central (MAS)',
    destination: 'Bengaluru City (SBC)',
    duration: '6h 10m',
    departure: '06:30',
    arrival: '12:40',
    seats: generateSeats(56)
  }
]
export default trains
