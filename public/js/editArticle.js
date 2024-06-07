import axios from "axios";

axios.defaults.withCredentials = true;

const thisUrl = window.location.href;
const slug = thisUrl.split("/").pop();

export const editPage = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:7000/api/v1/articles/edit/${slug}`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 500);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
