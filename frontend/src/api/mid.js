const api = process.env.REACT_APP_API_URL;

export const getMidProjects = () =>
  fetch(`${api}/build/mid-projects`)
    .then(res => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("📦 Mid projects response:", data);
      return data;
    });
