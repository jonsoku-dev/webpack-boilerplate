import "./app.css";
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  import(/* webpackChunkName: "result" */ "./result.js").then((m) => {
    console.log(m);
  });

  const res = await axios.get("/api/users");
  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

if (module.hot) {
  console.log("핫 모듈 켜짐");
}
