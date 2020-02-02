const getAnswer = (question,cedula, name) => {
  const questionBank = [
    ["¿ Cuanto es 3 X 3 ?", "9"],
    [
      "¿Escriba los dos ultimos digitos del documento a consultar?",
      cedula.substring(cedula.length - 2, cedula.length)
    ],
    [
      "¿Cual es el primer nombre de la persona a la cual esta expidiendo el certificado?",
      name.split(" ")[0]
    ],
    ["¿ Cual es la Capital del Vallle del Cauca?", "cali"],
    ["¿ Cual es la Capital del Atlantico?", "barranquilla"],
    ["¿ Cuanto es 2 X 3 ?", "6"],
    [
      "¿Escriba los tres primeros digitos del documento a consultar?",
      cedula.substring(0, 3)
    ],
    ["¿ Cual es la Capital de Antioquia (sin tilde)?", "medellin"],
    [
      "¿Escriba la cantidad de letras del primer nombre de la persona a la cual esta expidiendo el certificado?",
      name.split(" ")[0].length
    ],
    ["¿ Cuanto es 5 + 3 ?", "8"],
    ["¿ Cual es la Capital de Colombia (sin tilde)?", "bogota"],
    ["¿ Cuanto es 9 - 2 ?", "7"],
    [
      "¿Escriba las dos primeras letras del primer nombre de la persona a la cual esta expidiendo el certificado?",
      name.split(" ")[0].substring(0, 2)
    ]
  ];

  const answer = questionBank.filter(element => {
    return element[0] === question;
  });
  const result = answer[0][1];
  return result;
};

module.exports = {
  getAnswer
};
