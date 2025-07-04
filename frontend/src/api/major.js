const api = process.env.REACT_APP_API_URL;
export const getMajorProjects = () =>
  fetch(`${api}/major-projects`).then(res => res.json());
