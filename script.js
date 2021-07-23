// CÓDIGO COM MUITO COMENTARIOS A FIM DE ESTUDOS...



// quando ele for enviar o formulario ele executa uma função.
document.querySelector(".busca").addEventListener('submit', async /*async = Assíncrono código que não e ordenado */  (event)=> {
 /*previne comportamento padrão do fomulario, como se não envia-se nada.*/ event.preventDefault () ;
    /*pega oque ele digitou*/  
    let input = document.querySelector('#searchInput').value;
    
    if (input !== '') {
      clearInfo();
  showWarning ('Carregando...')
      // ECODEURI (COLOCA O NOME EM FORMATO SITE EX RIO DE JANNNEIRO "Rio%20de%20Janeiro")
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`

  // funcao  sistema de promesas vou fazer requisição vou esperar resposta  e quando tiver resposta
  // meu código continua

    //  fiz minha requisição espera ai o resultado quado deu ele armazeno em results
    let results = await fetch(url);
    //Agora pega o resultado e transforma em json
    let json = await results.json();

    //mostra as informações
      if (json.cod === 200) {
        showInfo({
          name : json.name,
          country: json.sys.country,
          temp : json.main.temp,
          tempIcon : json.weather[0].icon,
          windSpeed : json.wind.speed,
          windAngle : json.wind.deg
        })
      } else {
        //clearInfo criada para limpar caso n encontre a localização
        clearInfo()
        showWarning ('Não encontramos está localização!') // se der 404 que fizer que não foi encontrada a cidade
      }
       
    } else
    assistance('Porfavor Preencha o campo vazio!')
})

//MOSTRA INFORMAÇÕES NA TELA
function showInfo(json ){
  showWarning('');
//tirar o carregando e mostra os resultados

  
  
  // chamando nome da cidade e pais
document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`

// chamando temperatura
document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

//chamando vento
document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

//mudar icone chuva,frio,nublado,quente
document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

// icone do vento
document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`


document.querySelector('.resultado').style.display= "block";

}
// MENSAGEM DE CARREGAMENTO E VAZIO

// adicionar  uma mensagem de carregamento aguarde que ta carregado.
function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}
// adiciona uma mensagem caso o campo esteja vazio.
function assistance(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
  showWarning ('');
  document.querySelector('.resultado').style.display= "none";
}
