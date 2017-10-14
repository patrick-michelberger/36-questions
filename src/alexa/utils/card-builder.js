'use strict';

const buildWelcomeCard = () => {
  const title = 'Welcome to 36 Questions!';
  let content = 'The New York Times lists 36 questions you can ask someone ' +
      'if you want to fall in love. (Or make your love even stronger.) ' +
      'This skill provides the ideal experience for exploring these questions, so grab some wine, sit down with someone you want to love & let’s get started.';
  let imageObj = {
    smallImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/LogoForAlexa.png',
    largeImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/LogoForAlexa.png'
};
  return {
    title,
    content,
    imageObj
  }
};

module.exports = {
  buildWelcomeCard,
};