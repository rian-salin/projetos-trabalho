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


const globalStylesheet = "projeto-neo/styles/home.css"; //define css global

function carregar(route) {
    history.pushState({}, "", route); // Atualiza a URL sem recarregar a página
    carregaConteudo(route); // Carrega o conteúdo correspondente
}

function carregaConteudo(route) {
    const contentDiv = document.getElementById("content");

    fetch(routes[route] || routes["/"])
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html;

            
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
    // Remover o CSS específico da página anterior, Adiciona o CSS da nova página se existir.
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

// Garante que o CSS global (home.css) sempre esteja carregado.
(function addGlobalStylesheet() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = globalStylesheet;
    link.id = "global-style";
    document.head.appendChild(link);
})();

//Permite que o usuário use os botões "Voltar" e "Avançar" do navegador.
window.onpopstate = () => carregaConteudo(location.pathname); 

// Carregar a página inicial ao abrir o site
carregaConteudo(location.pathname);

