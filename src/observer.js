import {loadGif} from "../script.js";

const inViewPort = ([e]) => {
    const {isIntersecting, target} = e;

    if (isIntersecting) {
        loadGif();
        //////ResizeObserver.unobserver(target);
        observer.unobserve(target);
    }
    
};

const observer = new IntersectionObserver(inViewPort);

export const getObserver = (node) => {    
    observer.observe(node);
}