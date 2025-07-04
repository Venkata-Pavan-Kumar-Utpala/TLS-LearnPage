const api = process.env.REACT_APP_API_URL;
export const bookProject = (projectId, userEmail) =>
  fetch(`${api}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, userEmail })
  }).then(res => res.json());
