(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/jobs?_limit=6');
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Fetch error:', e);
    process.exit(1);
  }
})();
