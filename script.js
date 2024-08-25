function carregar() {
    var msg = document.getElementById("msg");
    var imagem = document.getElementById("imagem");
    var clima = document.getElementById("clima");
    var cidadeInput = document.getElementById("cidade");
    var cidade = cidadeInput.value || "Vitória da Conquista";
    var apiKey = "08864693ce6d85faf77c2e8674b43576";
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(cidade, "&appid=").concat(apiKey, "&units=metric&lang=pt_br");
    fetch(weatherUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var timezoneOffset = data.timezone; // Fuso horário em segundos
        var localTime = new Date(new Date().getTime() + timezoneOffset * 1000); // Hora local da cidade
        var hora = localTime.getUTCHours();
        var minutos = localTime.getUTCMinutes();
        var segundos = localTime.getUTCSeconds();
        msg.innerHTML = "Agora s\u00E3o ".concat(hora, " horas, ").concat(minutos, " minutos e ").concat(segundos, " segundos");
        if (hora >= 0 && hora < 12) {
            imagem.src = "manha.png";
            document.body.style.backgroundColor = "#f3d9b4";
        }
        else if (hora >= 12 && hora < 18) {
            imagem.src = "tarde.png";
            document.body.style.backgroundColor = "#ff7502";
        }
        else {
            imagem.src = "noite.png";
            document.body.style.backgroundColor = "#02162f";
        }
        clima.innerHTML = "Clima em ".concat(cidade, ": ").concat(data.weather[0].description, ", Temperatura: ").concat(data.main.temp, "\u00B0C");
    })
        .catch(function (error) {
        console.error("Erro ao obter dados do clima:", error);
        clima.innerHTML = "Não foi possível obter o clima.";
    });
}
// Atualização em tempo real
setInterval(carregar, 1000);
