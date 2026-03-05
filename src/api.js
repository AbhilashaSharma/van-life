export async function getVans() {
  const res = await fetch("/api/vans");
  const data = await res.json();
  const vans = await data.vans;

  return vans;
}
