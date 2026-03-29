const main = document.getElementById("main");

const state = { counter: 0 };

const routes = {
  "/": renderHome,
  "/about": renderAbout,
  "/contact": renderContact,
  "/counter": renderCounter
};

function router() {
  const path = location.hash.slice(1) || "/";

  const renderFunction = routes[path] || renderNotFound;
  renderFunction();
}



function renderHome() {
  main.innerHTML = `
    <h1>Home</h1>
    <p>This is the home page. </p>
  `;
}

function renderAbout() {
  main.innerHTML = `
    <h1>About</h1>
    <p>This SPA uses hash-based routing without page reload.</p>
  `;
}


function renderContact() {
  main.innerHTML = `
  <h1>Contact</h1>
  <p>This is the contact page.</p>
  `;
}

function renderCounter() { 
  main.innerHTML = `
            <h1>This page shows how state is maintained </h1>
            <h2>Counter</h2>
          <p>Count: ${state.counter}</p>
          <button id="inc">Increment</button>
          `; 
  document.getElementById("inc").addEventListener("click", () => { 
    state.counter++; 
    renderCounter(); 
  }); 
}

function renderNotFound() {
  main.innerHTML = `<h1>404 - Page Not Found</h1>`;
}

window.onhashchange = router;

window.onload = router;