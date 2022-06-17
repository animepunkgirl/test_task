//Get distance in meters and round it to kilometers
const distanceToReadable = (distance: number) => {
  const kilometers = distance / 1000;
  const meters = distance % 1000;
  if (kilometers > 0) return `${kilometers.toFixed(1)}км`;

  return `${meters}м`;
};

export default distanceToReadable;
