import {loadGif} from "../script.js";

const inViewPort = ([e]) => {
    const {isIntersecting, target} = e;

    if (isIntersecting) { //si es una "intersection" ejecutamos la carga de mas gifs
        loadGif();
        observer.unobserve(target);
    }    
};

const observer = new IntersectionObserver(inViewPort);

//Funcion exportable para ser llamada desde otros metodos
export const getObserver = (node) => {    
    observer.observe(node);
}