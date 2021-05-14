
const Home = require('../models/HomeModel')
const moment = require('moment');

exports.index = (req, res ) => {
  res.render('index');
};

exports.register = async (req, res) => {
  const home = new Home(req.body);
  
  try {
    await home.register();
    
    if(home.errors.length > 0) {
      req.flash('errors', home.errors);
      return res.redirect('/');
    }

    req.flash('success', 'Seu cadastro foi realizado com sucesso.')
    return res.redirect('/');
  } catch (e) {
    res.render('404')
    console.log(e)
  }
};