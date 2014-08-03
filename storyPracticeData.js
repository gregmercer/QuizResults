var storyPracticeData = 
{
  "id":"ps1",
  "paragraphs":
    [
      {"id":"1","text":"Para mí, Frida Kahlo es una de las más grandes artistas mexicanas. Cuando tenía 5 años sufrió una enfermedad muy grave llamada polio, y Frida sobrevivió, pero una de sus piernas le quedó muy débil, más corta y más delgada que la otra. Su padre era fotógrafo y artista y se cree que mantenía una relación muy profunda con Frida."},
      {"id":"2","text":"Ella hacía algunos retratos de sus familiares y amigos, pero sobretodo se pintó a sí misma rodeada de las cosas importantes para ella, y de las cosas que le causaban dolor. Sabemos que Frida pintaba sus sentimientos, sus emociones y su dolor y para ello utilizaba el colorido y las figuras tradicionales de su país y las imágenes religiosas del arte popular mexicano. Su final me parece muy triste y doloroso: el dolor se apoderó de ella impidiéndole hacer una vida normal y un año antes de morir se vieron obligados a amputarle una pierna y luego murió en su casa azul. Sus obras de arte, sin embargo, durarán para siempre."},
    ]
};

module.exports.all = storyPracticeData;

module.exports.convert = function(oldAnswer) {

  var newAnswer = '';

  //console.log('oldAnswer = ' + oldAnswer);

  // get the paragraph number from the answer

  var index = oldAnswer.indexOf(".");
  var paragraph = '';
  if (index != -1) {
    paragraph = oldAnswer.substring(1,index--);
  }  

  // get the answer with paragraph info stripped off

  var rawAnswer = oldAnswer.substring(index+2);

  // get the story word from the answer

  var wordStart = index+2;
  var storyWord = '';

  var index = oldAnswer.indexOf("[");
  if (index != -1) {
    storyWord = oldAnswer.substring(wordStart,index--);
  } else {
    storyWord = oldAnswer.substring(wordStart);
  }

  //console.log('storyWord = '+storyWord);

  //console.log('paragraph = '+paragraph);
  //console.log('paragraphs[0].text = '+storyPracticeData.paragraphs[paragraph-1].text);

  var text = storyPracticeData.paragraphs[paragraph-1].text;
  var textArray = text.split(' ');

  // find word index within the paragraph

  var wordIndex = -1;
  for (var index = 0; index < textArray.length; index++) {
    if (textArray[index] == storyWord) {
      wordIndex = index;
      break;
    }
  }

  //console.log('wordIndex = '+wordIndex);

  newAnswer = 'p' + paragraph + 'w' + wordIndex + '.' + rawAnswer;
  //console.log('newAnswer = ' + newAnswer);

  return newAnswer;
}
