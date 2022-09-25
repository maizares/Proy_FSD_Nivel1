import {getObserver} from "./src/observer.js";


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

const apiKey    = "FKIUAcOwZDwaBYJ6P2eXcbiNfRBTSwRK";
const urlApi    = "https://api.giphy.com/v1/gifs";//trending   // search
const contenedor= document.getElementById("main");
const cont_msg  = document.getElementById("dv_msg");
const dv_search = document.getElementById("dv_search");
let offset      = 0;

// - - - - - - - - - - - - - - - - - - - - - -

const makeImg = (element)=>{
    const img   = document.createElement("img");
    img.src     = element.images.original.url;
    img.alt     = element.title;

    return img;
}
// - - - - - - - - - - - - - - - - - - - - - -

const fetchData = async () => {
    const result    = await fetch(`${urlApi}/trending?api_key=${apiKey}&limit=10&offset=${offset}`);
    const {data}    = await result.json(); 
    offset         += 10;

    return data;
}
// - - - - - - - - - - - - - - - - - - - - - -

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
const searchData = async (p_text) => {
    const result    = await fetch(`${urlApi}/search?api_key=${apiKey}&limit=10&offset=${offset}&q=${p_text}`);
    const {data}    = await result.json(); 
    offset         += 10;
    
    //console.log(data);

    return data;
}
// - - - - - - - - - - - - - - - - - - - - - -
const buscaGif = async (p_text) => {
    cont_msg.innerHTML = "";
    const data              = await searchData(p_text);
    if(data.length){
        const lastImg           = data.pop();
        const lastImgTemplate   = makeImg(lastImg);
        getObserver(lastImgTemplate);        
        const templates = data.map((img) => makeImg(img));
        contenedor.append(...templates);
        contenedor.append(lastImgTemplate);
    }
    else{
        cont_msg.innerHTML = "<div class='cls_notfound txt-center'>No se encontró información para la búsqueda de <i class='cls_txt_search'>"+p_text+"</i></div>";
    }
}
// - - - - - - - - - - - - - - - - - - - - - -
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
const fn_showResult = () =>{
    let   v_list_bsqd    = "";
    let   v_array2       = new Array();
    
    if(localStorage.getItem("arr_search") != ""){
        dv_search.innerHTML= "<span class='cls_title_h'>Últimas búsquedas:</span>";

        v_array2 = JSON.parse(localStorage.getItem("arr_search"));
        //recorremos el array que contiene las busquedas
        //v_list_bsqd += "<span class='cls_title_h'>Últimas búsquedas:</span> ";
        //v_array2.forEach(valor => v_list_bsqd += "<span class='cls_record'>"+valor+"</span>");
        v_array2.forEach(fn_CreateRecord);
        //mostramos las busquedas en el div
        //dv_search.innerHTML=v_list_bsqd;

        //let btn1 = document.getElementsByClassName('cls_record');
        //console.log(btn1);
        //v_array2.forEach(valor => console.log("Valor=>"+valor));
        
        //btn1.addEventListener('click', fn_reload);
    }
}
// - - - - - - - - - - - - - - - - - - - - - -
//let v_array  = JSON.parse(localStorage.getItem("arr_search"));
let v_array1  = localStorage.getItem("arr_search");

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

const btn = document.getElementById('btnSearch');
btn.addEventListener('click', fn_search);
//localStorage.clear();
