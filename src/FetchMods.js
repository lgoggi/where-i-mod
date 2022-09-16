import { useState, useEffect } from "react";
import api from "./api";

function FetchMods(usuario) {
    const [listaAux, setListaAux] = useState('');
    const [lista, setLista] = useState('');
    const [arrayIcon, setArrayIcon] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setListaAux('')
        setLista('')
        setArrayIcon('')
        if (usuario !== '') 
        {
            setLoading(true)
            fetch(`https://modlookup.3v.fi/api/user-v3/${usuario}`) //busca lista da primeira API
                .then(res => {
                    if(res.status>=400){
                        return;
                    }
                    else
                        return res.json();
                    })
                .then(data => {
                    setListaAux(data.channels)
                }
                    )
        }
    }, [usuario])

    useEffect(() => {
        if (listaAux === '') {
            return;
        }
        else
        {
            var nomes = '';
            listaAux.map(i => nomes += 'login=' + i.name + '&') //gera pesquisa do segundo API
            api.get('https://api.twitch.tv/helix/users?' + nomes)
            .catch(function(error){
                if(error.response){
                    setLista(null);
                    return;
                }
            })
            .then(result =>{ 
                setArrayIcon(result.data.data)
            }) //salva resultados do segundo api

        }
    }, [listaAux])

    useEffect(() => {
        if (arrayIcon !== '' & listaAux !== '') 
        {
            setArrayIcon(arrayIcon.sort((a, b) => { return a.login.localeCompare(b.login) }))
            setListaAux(listaAux.sort((a, b) => { return a.name.localeCompare(b.name) })) //organiza as duas respostas em ordem alfabética
            for (let i = 0; i < listaAux.length; i++)  //compara as listas 
            {
                var match=0; //track dos itens compatíveis
                for (let j = 0; j <arrayIcon.length; j++)
                { 
                    if (listaAux[i].name === arrayIcon[j].login) 
                    {
                        match=1;
                        j=arrayIcon;
                    }
                }
                    if(match===0)
                    {
                        listaAux.splice(i, 1); //remove os itens que não são compatíveis 
                    }
            }
            setLoading(false)
            setLista(listaAux.map((n, index) => ({ ...n, icon: index + 1 && arrayIcon[index]?.profile_image_url }))) //junta as duas arrays
        }
    }, [arrayIcon, listaAux])
    
    if(loading){
        return 'loading'
    }
    return lista;
}
export { FetchMods }; 