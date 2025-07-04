const api = process.env.REACT_APP_API_URL;
export const getMiniProjects = () =>
  fetch(`${api}/mini-projects`).then(res => res.json());
