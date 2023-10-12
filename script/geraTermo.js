function carregarConteudoDoArquivo(url, callback) {
    fetch(url, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    })
        .then(function (response) {
            
            return response.text();
        })
        .then(function (data) {
            callback(data);
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao carregar o arquivo: " + error);
        });
}

function gerarTermoDeUso(event) {
    event.preventDefault(); 

    var nomeEmpresa = document.getElementById("nome_empresa").value;
    var urlSite = document.getElementById("url_site").value;
    var tempoRetencao = document.getElementById("tempo_retencao").value;


    carregarConteudoDoArquivo("termoDeUso.txt", function (termosTexto) {

    
        termosTexto = termosTexto.replace(/{nomeEmpresa}/g, nomeEmpresa);
        termosTexto = termosTexto.replace(/{URLSite}/g, urlSite);
        termosTexto = termosTexto.replace(/{tempoDeRetencao}/g, tempoRetencao);

        // Cria um novo Blob com o texto modificado
        var blob = new Blob([termosTexto], { type: "text/plain" });

        // Cria um link para download
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
    
        nomeEmpresa = nomeEmpresa.replace(/\s/g, "");

        link.download = `${nomeEmpresa}_termoDeUso.txt`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}