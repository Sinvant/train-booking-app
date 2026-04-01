export const formatTime = (timeString) => {
  // Handle different time formats
  if (!timeString) return '00:00';
  
  // Remove quotes if present
  const cleaned = timeString.toString().replace(/'/g, '');
  
  // If it's already in HH:MM:SS format, convert to HH:MM
  if (cleaned.includes(':')) {
    return cleaned.substring(0, 5);
  }
  
  return cleaned;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStationName = (train) => {
  return {
    source: train['source Station Name'] || train['Source Station Name'] || '',
    destination: train['Destination Station Name'] || '',
    sourceCode: train['Source Station Code'] || train['station Code'] || '',
    destinationCode: train['Destination station Code'] || '',
  };
};

export const getTrainInfo = (train) => {
  return {
    trainNo: train['Train No']?.["'"] || train['Train No'] || '',
    trainName: train['train Name'] || '',
    departure: formatTime(train['Departure time']),
    arrival: formatTime(train['Arrival time']),
    distance: train['Distance'] || 0,
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const calculateDuration = (departure, arrival) => {
  // Simple calculation - in real app, would handle day changes
  const [depHour, depMin] = departure.split(':').map(Number);
  const [arrHour, arrMin] = arrival.split(':').map(Number);
  
  let durationMin = (arrHour * 60 + arrMin) - (depHour * 60 + depMin);
  
  if (durationMin < 0) {
    durationMin += 24 * 60; // Add 24 hours if arrival is next day
  }
  
  const hours = Math.floor(durationMin / 60);
  const mins = durationMin % 60;
  
  return `${hours}h ${mins}m`;
};
