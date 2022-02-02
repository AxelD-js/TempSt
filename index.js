document.addEventListener('DOMContentLoaded',fetchTemps())
//Array que contiene todas las categorias (depende del codigo HTML)
const markers = ["solrstgen", "cpfr", "reparaciones"]



//Funcion que manda a fetchear todos los JSON
markers.forEach((element) => {
    window[element] = document.querySelector(`#${element}`)
})

//Función que crea los botones en sus respectivas categorias

async function fetchTemps() {
    const response = await fetch(`db.json`);
    const data = await response.json();

    data.forEach((element,index) => {
        let boton = document.createElement('button');
        boton.className = 'btn';
        boton.id = index
    
        let titulo = document.createElement('h1');
        titulo.className = 'title'
        titulo.textContent = element.titulo
        
        boton.appendChild(titulo)
        window[element.id].appendChild(boton)
        
        boton.addEventListener('dblclick', () => copy(element.cuerpo, element.postcopy))
})};

//Funcion que copia el clipboard y genera la template

function copy(body,postbody) {
    if (postbody === "") {
        console.log(body) 
        copyToClip(body);
    } else {
        navigator.clipboard.readText()
        .then((clipboard) => {
            console.log(clipboard)
            const clipcopy = `<a href="${clipboard}"> ${clipboard} </a>`;
            const temp = body + "<br><br>" + clipcopy + "<br><br>" + postbody
            console.log(temp) 
            copyToClip(temp)
        }) 
    }
}

//Function que pega al clipboard

function copyToClip(str) {
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
      console.log(str)
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };




