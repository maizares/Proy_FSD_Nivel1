const fn_buscar = () =>{
    
    let v_texto     = document.getElementById("txt_buscar").value;

    if(v_texto != ""){
        let v_array2 = new Array();
        if(localStorage.getItem("arr_buscar") != ""){
            v_array2 = JSON.parse(localStorage.getItem("arr_buscar"));
        }
        if(v_array2.length > 2){
            v_array2.shift(0);
        }
        v_array2.push(v_texto);
        localStorage.setItem("arr_buscar",JSON.stringify(v_array2));
                
        fn_muestraBusquedas();
    }
    else{
        document.getElementById("dv_bsqd").innerHTML="Debe ingresar algun texto";        
    }
}

const fn_recarga = (p_valor) =>{

    document.getElementById("txt_buscar").value = p_valor;
    fn_buscar();
}

const fn_muestraBusquedas = () =>{
    let v_list_bsqd = "";
    let v_array2 = new Array();
    if(localStorage.getItem("arr_buscar") != ""){
        v_array2 = JSON.parse(localStorage.getItem("arr_buscar"));
        //recorremos el array que contiene las busquedas
        v_list_bsqd += "<span class=''>Últimas búsquedas:</span> ";
        v_array2.forEach(valor => v_list_bsqd += "<span class='class-record' onclick='fn_recarga(\""+valor+"\")'>"+valor+"</span>");
        //mostramos las busquedas en el div
        document.getElementById("dv_bsqd").innerHTML=v_list_bsqd;
    }
}

fn_muestraBusquedas();
