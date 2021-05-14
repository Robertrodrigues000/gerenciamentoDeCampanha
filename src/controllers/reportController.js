const Report = require('../models/HomeModel')
const moment = require('moment');

exports.index = async(req, res) => {
  const anuncios = await Report.buscaAnuncios()

  const anunciosFinal = anuncios.map(anuncio => {      
    
    const diff = moment(anuncio.termino,"YYYY-MM-DDTHH:mm:ss.sTZD")
    .diff(moment(anuncio.inicio,"YYYY-MM-DDTHH:mm:ss.sTZD"));
    const dias = moment.duration(diff).asDays();
    const {investimento} = anuncio;

    const dataCerta = moment(anuncio.inicio).format('L');
    
    const visualizacoesSemCompartilhar = investimento *30;
    const cliques = visualizacoesSemCompartilhar/100*12;
    let compartilhamentos = cliques/20*3;
    if(compartilhamentos >= 4) compartilhamentos = 4;
    const compartilhamentosTotais = compartilhamentos* dias;
    const visualizacoes = visualizacoesSemCompartilhar + compartilhamentosTotais*40;

    const obj = {
      ...anuncio._doc,
      intervalo: dias,
      totalInvestido: dias* investimento,
      data: dataCerta,
      visualizacoes: visualizacoes,
      cliques: cliques,
      compartilhamentos: compartilhamentosTotais
    }
    return obj;

  });

  res.render('report',  { anunciosFinal } );
}