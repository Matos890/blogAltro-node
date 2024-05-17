import axios from 'axios'; 
axios.defaults.withCredentials =true;

export const submitNewArticleJs = async (imageCover,title,category,article,summary) => {
    try {
        // Recupera il token JWT dal cookie
        const token = new URLSearchParams(window.location.hash).get('access_token')
        const res = await axios({
            method: "POST",
            url: "http://localhost:7000/api/v1/articles/submit-new-article",
            data: {
                title,
                summary,
                imageCover,
                category,
                article,
            },
            headers:
            {
                 'content-type':'application/json',
                 'accept': 'application/json',
                 'Authorization': token,
           }
            
        });
        console.log(res.data.status);
        if (res.data.status === "success") {
            window.setTimeout(() => {
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        console.log("error", err.response.data.message);
    }
};
