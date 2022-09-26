import {getObserver} from "./src/observer.js"; //importamos el observador


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

const apiKey    = "FKIUAcOwZDwaBYJ6P2eXcbiNfRBTSwRK";   // API key
const urlApi    = "https://api.giphy.com/v1/gifs";      // Url Api
const contenedor= document.getElementById("main");      // contenedor para mostrar los gif
const cont_msg  = document.getElementById("dv_msg");    // contenedor para mostrar los mensajes
const dv_search = document.getElementById("dv_search"); // contenedor para mostrar las busquedas
let offset      = 0;

// - - - - - - - - - - - - - - - - - - - - - -
//Función que crea los elementos con los gifs
const makeImg = (element)=>{
    const v_div = document.createElement("div");
    const img   = document.createElement("img");
    img.src     = element.images.original.url;
    img.alt     = element.title;
    v_div.className = "cls_column";
    v_div.append(img);
    return v_div;
}
// - - - - - - - - - - - - - - - - - - - - - -
//Función que ejecuta la obtencion de los gifs desde la api "giphy"
const fetchData = async () => {
    const result    = await fetch(`${urlApi}/trending?api_key=${apiKey}&limit=10&offset=${offset}`);
    const {data}    = await result.json(); 
    offset         += 10;

    return data;
}
// - - - - - - - - - - - - - - - - - - - - - -
//Función que carga los gifs iniciales
export const loadGif = async () => {

    const data              = await fetchData();
    const lastImg           = data.pop();
    //console.log(lastImg);
    const lastImgTemplate   = makeImg(lastImg);
    getObserver(lastImgTemplate);
    //console.log("Hola=>" + lastImgTemplate);
    const templates = data.map((img) => makeImg(img));
    contenedor.append(...templates);
    contenedor.append(lastImgTemplate);    
}
// - - - - - - - - - - - - - - - - - - - - - -
window.addEventListener("load",loadGif);





// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - SEARCH - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Función asincrona que realiza la ejecucion de la api para la búsqueda
const searchData = async (p_text) => {
    const result    = await fetch(`${urlApi}/search?api_key=${apiKey}&limit=10&offset=${offset}&q=${p_text}`);
    const {data}    = await result.json(); 
    offset         += 10;
    return data;
}
// - - - - - - - - - - - - - - - - - - - - - -
//Función que inicia la busqueda de gifs
const buscaGif = async (p_text) => {
    cont_msg.innerHTML = "";
    const data              = await searchData(p_text);
    if(data.length){
        cont_msg.innerHTML = "Resultado para <i> \""+p_text+"\"</i>";
        const lastImg           = data.pop();
        const lastImgTemplate   = makeImg(lastImg);
        getObserver(lastImgTemplate);        
        const templates = data.map((img) => makeImg(img));
        contenedor.append(...templates);
        contenedor.append(lastImgTemplate);
    }
    else{
        cont_msg.innerHTML = "<div class='cls_notfound txt-center'>No se encontró información para la búsqueda de <i class='cls_txt_search'>\""+p_text+"\"</i></div>";
    }
}
// - - - - - - - - - - - - - - - - - - - - - -
//Función que crea los items que se buscaron
const fn_CreateRecord = (p_item) =>{

    let v_item = document.createElement("span");
    v_item.innerHTML = p_item;
    v_item.className = "cls_record";
    
    v_item.addEventListener('click', function({ target }) {
        document.getElementById("txt_search").value = target.textContent;
        fn_search();
    })
    
    dv_search.append(v_item);
}
// - - - - - - - - - - - - - - - - - - - - - -
//Función que muestra en pantalla las ultimas 3 búsquedas
const fn_showResult = () =>{
    let   v_list_bsqd    = "";
    let   v_array2       = new Array();
    
    if(localStorage.getItem("arr_search") != ""){
        dv_search.innerHTML= "<span class='cls_title_h'>Últimas búsquedas:</span>";

        v_array2 = JSON.parse(localStorage.getItem("arr_search"));
        v_array2.forEach(fn_CreateRecord);
        
    }
}
// - - - - - - - - - - - - - - - - - - - - - -
// localStorage donde se guardan las ultimas 3 búsquedas
let v_array1  = localStorage.getItem("arr_search");
//Función que guarda las búsquedas en el localStarage
const fn_search = () => {
    contenedor.innerHTML="";
    let v_text     = document.getElementById("txt_search").value;

    if(v_text != ""){
        let v_array2 = new Array();
        if(v_array1 != null){           
            v_array2 = JSON.parse(localStorage.getItem("arr_search"));
            
            if(v_array2.length > 2){
                v_array2.shift(0);            
            }
            v_array2.push(v_text);
            localStorage.setItem("arr_search",JSON.stringify(v_array2));
        }
        else{
            v_array2.push(v_text);
            localStorage.setItem("arr_search",JSON.stringify(v_array2));
        }        
        fn_showResult();
        buscaGif(v_text);
    }
    else{
        cont_msg.innerHTML="Debe ingresar algún texto para buscar";        
    }    
}
const fn_keypress = (e) =>{
    if(e.charCode ===13){
        fn_search();
    };
}

//asignamos el evento "click" al boton de buscar
const btn_search = document.getElementById('btnSearch');
btn_search.addEventListener('click', fn_search);

//asignamos el evento "keypress" para el campo texto
const txt_search = document.getElementById('txt_search');
txt_search.addEventListener('keypress', fn_keypress);

fn_showResult();//mostramos las busquedas
