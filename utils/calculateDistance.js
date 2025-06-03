
export const calculateDistance = (lat1, long1, lat2, long2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const RadiusOfEarth = 6371;
  const dLat = toRad(lat2 - lat1);
  const dlong = toRad(long2 - long1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dlong / 2) *
      Math.sin(dlong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RadiusOfEarth * c; // Distance in KM
};
