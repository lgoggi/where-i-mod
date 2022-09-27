import { useRef, useState } from "react";


import Ordenar from "./GerarLista";
import './App.css';
import {FetchMods} from "./FetchMods";



function App() {
  //declarações iniciais
  const [searchArea, setSearchArea]= useState('');
  const searchAreaRef = useRef(null);

  const [inner_search, setInner_search] = useState('');
  
  const [IsCheckedPartner, setIsCheckedPartner] = useState(false); 
  const [ListaFiltros, setListaFiltros]= useState([IsCheckedPartner]);
  const [ordem, setOrdem] = useState('1');
  const [IsDarkMode, setIsDarkMode] = useState(false);

  var lista = '';
  // fim das declarações inicias

  // lista de constantes
  const selects = [ //opções de organização 
  { label: '+ followers', valueS: '1' },
  { label: '- followers', valueS: '2' },
  { label: 'name', valueS: '3' }
  ]
  const filtros = [
    {
      name: 'Partner',
      checked: IsCheckedPartner,
      label: 'Partner',
    }
  ]
  // fim da lista de constantes 


  //handles
    function changeMode()
    {
      setIsDarkMode(!IsDarkMode);
      let element = document.getElementById("corpo");
      element.classList.toggle("dark");
      element = document.getElementById("header");
      element.classList.toggle("dark");
      element = document.getElementById("header_searchbar2");
      element.classList.toggle("dark");
      element = document.getElementById('button');
      element.classList.toggle("ButtonDark")
      element = document.getElementById("lightMode");
      element.classList.toggle("lightModeOff");
      element = document.getElementById("darkMode");
      element.classList.toggle("darkModeOn");
      element = document.getElementById("leftBox");
      element.classList.toggle("dark");
      element = document.getElementById("topBar");
      element.classList.toggle("dark");
      element = document.getElementById("SelectORG");
      element.classList.toggle("dark");
      element = document.getElementById("rightBox");
      element.classList.toggle("dark");
    }


              // search bar
  const handleSearch = (e) =>{
    e.preventDefault();
    setSearchArea(searchAreaRef.current.value);
  }
              //lida com os filtros
  function handleChangeFiltros(filtro, status)
  {
    switch (filtro)
    {
      default:
        break;
      case 'Partner':
        setIsCheckedPartner(!status);
        setListaFiltros([!status]);
        break;
    }
  }

  //fim handles 

  // gera e renderiza a lista de mods
  lista = FetchMods(searchArea);
  if (lista !== '' & lista!=='loading') { //verifica se uma pesquisa foi feita
    lista = Ordenar(lista, ordem, ListaFiltros, inner_search, IsDarkMode) //invoca a função ordenar
  }
  else if(lista==='loading'){
    lista=<div className="loading"></div>;
  }
  else 
    return (
      <div className='homepage' id='homepage'>
        <label className="header_search_label">search for your user on Twitch</label>
        <form className="header_searchbar" id='header_searchbar2'>
          <button onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
          <input placeholder=" user" ref={searchAreaRef} className='searchbar' />
        </form>
      </div>
    )
  //fim

  return (
    <div className="corpo" id='corpo'>
      <div className='header' id='header'>
        <button onClick={()=>document.location.reload(true)} className='home'>HOME</button>
        <label className="header_search_label">Search for user</label>
          <form className="header_searchbar" id='header_searchbar2'>
            <button onClick={handleSearch}><span className="material-symbols-outlined">search</span></button>
            <input placeholder=" user" ref={searchAreaRef}  className='searchbar'/>
          </form>
        <button className="ButtonLight" id='button' onClick={()=>changeMode()}>
          <div className="lightModeOn" id="lightMode">
            <span className="material-symbols-outlined">light_mode</span>
          </div>
          <div className="darkModeOff" id='darkMode'>
            <span className="material-symbols-outlined">dark_mode</span>
          </div>
        </button>
      </div>
      <div className='listaMembros'>CHANNELS YOU MOD:</div>
      <div className='leftBox' id='leftBox'>
        <div className='leftBox_filtros'> Filters:
          {filtros.map(filtros => {
            return (
              <div key={filtros.name} >
                <input type='checkbox' name={filtros.name} value={IsCheckedPartner} onChange={() => handleChangeFiltros(filtros.name, filtros.checked)} />
                <label> {filtros.name} </label> <br></br>
              </div>)
          }
          )}
        </div>
      </div>
      <div className='topBar' id='topBar'>
        <div className="topBar_inner_search">
          <span className="material-symbols-outlined">search</span>
          <input  className="searchbar2" placeholder=" channel" value={inner_search} onChange={(e) => setInner_search(e.target.value)} />
        </div>
        <div className="showing"> Showing: { lista ? lista.length : 0}</div>
        <div className='topBar_selecionar'>
          <label> Sort by <br></br>
            <select name='organizar' className='SelectORG' id='SelectORG' value={ordem} onChange={(e) => setOrdem(e.target.value)}>
              {selects.map(labels => { return (<option key={labels.label} value={labels.valueS}> {labels.label} </option>) })}
            </select>
          </label>
        </div>
      </div>
      <div className="rightBox" id='rightBox'> {lista}</div>
      <div className="footer">
        <a href='https://twitter.com/luki304' target="_blank" rel="noreferrer" className="footerIconLink"><img src="https://www.clipartmax.com/png/full/358-3583685_twitter-icon-transparent-circle.png" alt='twitter logo' className="footerIcon"/></a>
        <a href='https://github.com/lgoggi/where-i-mod.v2' target="_blank" rel="noreferrer" className="footerIconLink"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='github logo'className="footerIcon"/></a>
      </div>
    </div>
  );
}
export default App;
