const api = process.env.REACT_APP_API_URL;
export const getProjectById = (id) =>
  fetch(`${api}/project/${id}`).then(res => res.json());
