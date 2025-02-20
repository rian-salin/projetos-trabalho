const routes = {
    "/": "projeto-neo/pages/index.html", 
    "/cadastro-Perfil": "projeto-neo/pages/cadastro-Perfil.html",
    "/cadastroAPI": "projeto-neo/pages/cadastroAPI.html",
    "/homol-Produc": "projeto-neo/pages/homol-Produc.html"
};

const stylesheets = {
    "/cadastro-Perfil": "projeto-neo/styles/cadastro-Perfil.css",
    "/cadastroAPI": "projeto-neo/styles/cadastroAPI.css",
    "/homol-Produc": "projeto-neo/styles/homol-produc.css"
};


const globalStylesheet = "projeto-neo/styles/home.css";

function navigateTo(route) {
    history.pushState({}, "", route);
    loadContent(route);
}

function loadContent(route) {
    const contentDiv = document.getElementById("content");

    fetch(routes[route] || routes["/"])
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html;

            // Remover classes antigas e adicionar a classe da página atual
            contentDiv.classList.remove("perfil-page", "cadastroapi-page", "homol-produc-page");

            if (route === "/cadastro-Perfil") {
                contentDiv.classList.add("perfil-page");
            } else if (route === "/cadastroAPI") {
                contentDiv.classList.add("cadastroapi-page");
            } else if (route === "/homol-Produc") {
                contentDiv.classList.add("homol-produc-page");
            }

            // Carregar o CSS específico da página
            loadStylesheet(stylesheets[route]);
        })
        .catch(() => contentDiv.innerHTML = "<h1>Erro ao carregar a página</h1>");
}

function loadStylesheet(cssFile) {
    // Remover o CSS específico da página anterior, mas manter o global
    const oldLink = document.getElementById("page-style");
    if (oldLink) oldLink.remove();

    if (cssFile) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile;
        link.id = "page-style";
        document.head.appendChild(link);
    }
}

// Adicionar o CSS global (home.css) ao carregar a página
(function addGlobalStylesheet() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = globalStylesheet;
    link.id = "global-style";
    document.head.appendChild(link);
})();

// Manter o estilo ao navegar pelo histórico
window.onpopstate = () => loadContent(location.pathname);

// Carregar a página inicial ao abrir o site
loadContent(location.pathname);

