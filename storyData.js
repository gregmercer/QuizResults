var storyData = 
{
  "id":"s1",
  "paragraphs":
    [
      {"id":"1","text":"El pueblo azteca, como pueblo primitivo, descubrió una solución a los problemas presentados por las fuerzas de la naturaleza. Se sabe que el pueblo azteca daba mucha importancia a su religión, sobre todo a su dios principal y todopoderoso Tonatiuh (el sol). Tonatiuh poseía las mismas bondades y los defectos de los humanos, pero con un gran poder sobrenatural. Durante su historia, los antiguos mexicanos le sacrificaron muchos humanos al sol pero no por crueldad ni instintos bárbaros, sino por respeto y adoración."},
      {"id":"2","text":"Los Aztecas construyeron muchos monumentos para honrar al sol que tanto admiraban. Entre estos monumentos el más importante era la Piedra del Sol. Hoy día, se la conoce también con los nombres de Calendario Azteca o Jícara de Águilas (el pueblo Azteca le dio el nombre de Cuauhxicalli). El Calendario Azteca es una de las obras de arte más hermosas de esta cultura. Es un monolito o monumento de piedra."},
      {"id":"3","text":"Se supone que el pueblo Azteca empezó a construir el monumento de piedra en 1449. Como el sol tiene mucha luz, razón por la cual los aztecas lo querían mucho, los cabellos de Tonatiuh son de color dorado en el monolito. En el rostro de la escultura, el pueblo Azteca incluyó arrugas, las cuales son características de una persona vieja y que, según los aztecas, demostraban madurez y sabiduría."},
      {"id":"4","text":"Por último, los antiguos mexicanos le pusieron una lengua al sol en su representación de este dios en el monolito, la que cuelga hacia fuera como un cuchillo. Esto indica que es necesario que alimenten al dios Sol con sustancias mágicas, que, en esa época, incluían el corazón de un humano. La lengua en el sol simboliza el profundo respeto de los aztecas hacia Tonatiuh."},
      {"id":"5","text":"Se encontró el monolito el 17 de diciembre de 1790. Estaba vuelto hacia abajo, con una cara esculpida. En la cara, se podía ver el rostro del Tonatiuh, el sol, a quien honraban los aztecas como el amo y señor de los cielos. Después de encontrar el  calendario por primera vez, lo trasladaron a la Catedral Metropolitana y en 1885 lo colocaron en una de las salas del Museo Nacional de Historia. Hoy día está en el Museo Nacional de Antropología, en el Bosque de Chapultepec."}
    ]
};

module.exports.all = storyData;

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
  //console.log('paragraphs[0].text = '+storyData.paragraphs[paragraph-1].text);

  var text = storyData.paragraphs[paragraph-1].text;
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
