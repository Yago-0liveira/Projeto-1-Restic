function carregar(): void {
    const msg = document.getElementById("msg") as HTMLElement;
    const imagem = document.getElementById("imagem") as HTMLImageElement;
    const clima = document.getElementById("clima") as HTMLElement;
    const cidadeInput = document.getElementById("cidade") as HTMLInputElement;
    const cidade = cidadeInput.value || "Vitória da Conquista";
    
    const apiKey = "08864693ce6d85faf77c2e8674b43576"; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
  
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        const timezoneOffset = data.timezone; // Fuso horário em segundos
        const localTime = new Date(new Date().getTime() + timezoneOffset * 1000); // Hora local da cidade
  
        const hora = localTime.getUTCHours();
        const minutos = localTime.getUTCMinutes();
        const segundos = localTime.getUTCSeconds();
        
        msg.innerHTML = `Agora são ${hora} horas, ${minutos} minutos e ${segundos} segundos`;
  
        if (hora >= 0 && hora < 12) {
          imagem.src = "manha.png";
          document.body.style.backgroundColor = "#f3d9b4";
        } else if (hora >= 12 && hora < 18) {
          imagem.src = "tarde.png";
          document.body.style.backgroundColor = "#ff7502";
        } else {
          imagem.src = "noite.png";
          document.body.style.backgroundColor = "#02162f";
        }
  
        clima.innerHTML = `Clima em ${cidade}: ${data.weather[0].description}, Temperatura: ${data.main.temp}°C`;
      })
      .catch((error) => {
        console.error("Erro ao obter dados do clima:", error);
        clima.innerHTML = "Não foi possível obter o clima.";
      });
  }
  
  // Atualização em tempo real
  setInterval(carregar, 1000);
  
  