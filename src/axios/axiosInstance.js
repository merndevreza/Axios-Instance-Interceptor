import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  //   timeout: 1000, //timeout 1S means- axios will wait 1s in server to get requested response but if the server don't response within 1s axios will cancel the request and comeback.
});

const token = "kijoidsafjsdnbfjsdvsd";
//Intercept during request
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept During Response
axiosInstance.interceptors.response.use((response)=>{
  return response
},(err)=>{
  console.log(err);
  if (err.response) {
    err.message=`Error occurred at server with status: ${err.response.status}, message:${err.response.statusText}`
  }
return Promise.reject(err)
})
export default axiosInstance;
