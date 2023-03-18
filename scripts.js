const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const barraDePesquisa = document.querySelector(".pesquisar input")
const botaoDePesquisa = document.querySelector(".pesquisar button")
const iconeClima = document.querySelector(".icone-clima")

async function verificarClima(cidade){
    const resposta = await fetch(apiUrl + cidade + `&appid=${apiKey}`);

    if(resposta.status == 404){
        document.querySelector(".erro").style.display = "block";
        document.querySelector(".clima").style.display = "none";
    }else{
        var dados = await resposta.json();
        
        document.querySelector(".cidade").innerText = dados.name;
        document.querySelector(".temperatura").innerText = Math.round(dados.main.temp) + "°C";
        document.querySelector(".umidade").innerText = dados.main.humidity + "%";
        document.querySelector(".vento").innerText = dados.wind.speed + "Km/h";

        if(dados.weather[0].main == "Clouds"){
            iconeClima.src = "images/clouds.png"
        }
        else if(dados.weather[0].main == "Rain"){
            iconeClima.src = "images/rain.png"
        }else if(dados.weather[0].main == "Drizzle"){
            iconeClima.src = "images/drizzle.png"
        }else if(dados.weather[0].main == "Mist"){
            iconeClima.src = "images/mist.png"
        }else if(dados.weather[0].main == "Clear"){
            iconeClima.src = "images/clear.png"
        }else if(dados.weather[0].main == "Snow"){
            iconeClima.src = "images/snow.png"
        }


        document.querySelector(".clima").style.display = "block";
        document.querySelector(".erro").style.display = "none";

    }
}

botaoDePesquisa.addEventListener("click", ()=>{
    verificarClima(barraDePesquisa.value);
})

barraDePesquisa.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
        verificarClima(barraDePesquisa.value)
    }
})
