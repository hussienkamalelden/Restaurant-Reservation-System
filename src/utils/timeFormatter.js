export function minutesToHours(totalMinutes) {
  if (totalMinutes < 0) return '0 Min';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0 ? `${hours} Hr ${minutes} Min` : `${minutes} Min`;
}
