export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateSearchParams = (source, destination) => {
  const errors = {};

  if (!source || source.trim() === '') {
    errors.source = 'Source station is required';
  }

  if (!destination || destination.trim() === '') {
    errors.destination = 'Destination station is required';
  }

  if (source === destination) {
    errors.destination = 'Source and destination cannot be the same';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBooking = (booking) => {
  const errors = {};

  if (!booking.passengerName || booking.passengerName.trim() === '') {
    errors.passengerName = 'Passenger name is required';
  }

  if (!booking.age || booking.age <= 0) {
    errors.age = 'Valid age is required';
  }

  if (!booking.gender) {
    errors.gender = 'Gender is required';
  }

  if (!booking.seats || booking.seats.length === 0) {
    errors.seats = 'At least one seat must be selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
