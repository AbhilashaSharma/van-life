export async function getVans() {
  const res = await fetch("/api/vans");
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        status: res.status,
        message: "Failed to fetch vans",
        statusText: res.statusText,
      }),
    );
  }
  const data = await res.json();
  return data.vans;
}
