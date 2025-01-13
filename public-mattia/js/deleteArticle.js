import axios from "axios";

axios.defaults.withCredentials = true;
const thisUrl = window.location.href;
const slug = thisUrl.split("/").pop();
export const deleteThisArticle = async () => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:7000/api/v1/articles/${slug}`,
      headers: { "Content-Type": "application/json" },
    });
if (res.status ===204)
	  {window.setTimeout(() => {
      window.location.assign("/");
      console.log("delete");
    }, 150)} ;
  } catch (err) {
    console.error("error");
  }
};
