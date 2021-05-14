const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  nome: { type: String, required: true},
  cliente: { type: String, required: true},
  inicio: { type: Date, required: true},
  termino: { type: Date, required: true},
  investimento: { type: Number, required: true},
  criadoEm: { type: Date, default: Date.now },
  dias: { type: Number, default: Date.now }
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.cadastro = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;
    this.cleanUp();

    try {
      this.cadastro = await HomeModel.create(this.body);
    } catch(e) {
      console.log(e)
    }
   
  }

  valida(){
    if(!this.body.nome) this.errors.push('O nome do anúncio é um campo obrigatório.')
    if(!this.body.cliente) this.errors.push('O campo nome do cliente é obrigatório.')
    if(!this.body.inicio) this.errors.push('É obrigatório a data para início do anúncio.')
    if(!this.body.termino) this.errors.push('É obrigatório a data para o fim do anúncio.')
    if(!this.body.investimento) this.errors.push('O investimento do anúncio é um campo Obrigatório.')
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      nome: this.body.nome,
      cliente: this.body.cliente,
      inicio: this.body.inicio,
      termino: this.body.termino,
      investimento: this.body.investimento
    };
  }
}

Home.buscaAnuncios = async function() {
  const anuncios = await HomeModel.find()
    .sort({ criadoEm: -1 })
    return anuncios;
}


module.exports = Home;