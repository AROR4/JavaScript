const container = document.getElementById("container");
const loading = document.getElementById("loading");


let isLoading = false;

async function loadData() {
  if (isLoading) return;

  isLoading = true;
  loading.style.display = "block";

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7`);
    const data = await res.json();

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error fetching data", err);
  }

  loading.style.display = "none";
  isLoading = false;
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadData();
  }
});

loadData();