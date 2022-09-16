
const generate=(membro, classClick, classContent)=>{
  return (
    membro.map(membro=>{
      return(
      <a key={membro.name} href={'http://www.twitch.tv/' + membro.name} target="_blank" rel="noreferrer" className={classClick} >
      <div className={classContent}>
        <img src={membro.icon} width='70rem' alt='' className='rightBox_card_content_icon' />
        <div className="rightBox_card_content_name">{membro.name}</div>
        <div className="rightBox_card_content_followers"><span className="material-symbols-outlined">person</span><span>:{membro.followers}</span></div>
      </div>
    </a>)
    })
    )
}

const order=(ordem, lista)=>{
  switch (ordem) { //valor definido pelo selectORG
    case '1':
      lista.sort((a, b) => parseFloat(b.followers) - parseFloat(a.followers)); //ordem crescente de seguidores
      break;
    case '2':
      lista.sort((a, b) => parseFloat(a.followers) - parseFloat(b.followers)); //ordem decrescente de seguidores
      break;
    case '3':
      lista.sort((a, b) => { return a.name.localeCompare(b.name) }); //ordem alfabética
      break;
    default:
      break;
  }
}

function Ordenar(lista, ordem, ListaFiltros, inner_search, IsDarkMode) {  // (array de mods, padrão de ordenagem, filtros, pesquisa na lista, parte da lista a ser exibida)
  if(IsDarkMode) //reaplica o dark mode nos rerender
  {
    var classCardClick='rightBox-card-click-dark';
    var classCardContent="rightBox-card-content-dark";
  }
  else
  {
    classCardClick='rightBox-card-click';
    classCardContent='rightBox-card-content';
  }


  if (lista) { 
    //aplica filtro
    if (ListaFiltros[0]) {
      lista = lista.filter((f) => f.partnered === true);
    }
    // ----------------
//barra de pesquisa
    if (inner_search !== '') { 
      order(ordem, lista)
      return (generate( lista.filter((f) => f.name.toLowerCase().includes(inner_search.toLowerCase())), classCardClick, classCardContent))
    }
// ----------------



//ordena a lista de acordo com critério
    order(ordem, lista)
    return (generate(lista, classCardClick, classCardContent))
  }
  else
  {
    return <div className="ErrorUser">User not found</div>
  }
// ----------------
}

export default Ordenar;

