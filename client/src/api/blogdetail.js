// export const getBlogById = async (id) => {
//     const res = await fetch(`http://localhost:3000/blog/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch blog");
//     return res.json();
//   };
  import api from './axios';

export const getBlogById = (id) => {
  return api.get(`/blogpage/${id}`).then(res => res.data);
};
