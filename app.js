import words from "./constants.js";

const textbox = document.getElementById("textbox");
let result = [];
let errorList = [];
const table = document.getElementById("table");
const tableSyntax = document.getElementById("table-syntax");

document.querySelector("#submmit").addEventListener("click", analize);

function resetAll() {
  result = [];
  errorList = [];
  table.innerHTML = `<thead class="animate__animated animate__fadeInUp">
                        <tr>
                        <th>Token</th>
                        <th>Lexema</th>
                        <th>#</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                    </tbody>`;
  tableSyntax.innerHTML = `<thead class="animate__animated animate__fadeInUp">
                    <tr>
                    <th>Mensaje</th>
                    <th>Posicion</th>
                    <th>#</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>`;
}

// Lexical analyzer
function analize() {
  const text = textbox.value;
  if (!text) return;
  resetAll();

  // Removemos todos los saltos de linea y dividimos el texto en palabras
  const formattedText = text
    .replace(/(\r\n|\n|\r)/gm, " ") /* Removemos saltos de linea */
    .split(" ") /* Dividemos el texto en palabras */
    .filter((word) => word !== ""); /* Filtramos los espacios en blanco */

  // Recorremos el texto
  for (let i = 0; i < formattedText.length; i++) {
    const text = formattedText[i];

    // Comprobamos si es una palabra reservada
    if (words.reservedWords.includes(text)) {
      result.push({
        text: text,
        type: "Reservada",
      });
    }
    // Comprobamos si es un operador
    else if (words.operators.includes(text)) {
      result.push({
        text: text,
        type: "Operador",
      });
    }

    // Comprobamos si es una comparacion
    else if (words.comparations.includes(text)) {
      result.push({
        text: text,
        type: "Comparación/igualación",
      });
    }

    // Comprobamos si es una declaracion
    else if (words.declarations.includes(text)) {
      result.push({
        text: text,
        type: "Declaración",
      });

      // comprobamos si es un numero
    } else if (words.numbers.test(text)) {
      result.push({
        text: text,
        type: "Número",
      });
    } else {
      const { endline, parenthesesL, parenthesesR } = words.separators;
      let sub = "";
      const types = {
        [endline]: "Fin linea",
        [parenthesesL]: "ParentesisIq",
        [parenthesesR]: "ParentesDer",
      };

      if (
        text.includes(endline) ||
        text.includes(parenthesesL) ||
        text.includes(parenthesesR)
      ) {
        Array.from(text).forEach((el) => {
          if ([endline, parenthesesL, parenthesesR].includes(el)) {
            if (sub) {
              if (words.numbers.test(text)) {
                result.push({
                  text: sub,
                  type: "Número",
                });
              } else {
                result.push({
                  text: sub,
                  type: "Identificador",
                });
              }
            }

            result.push({
              text: el,
              type: types[el],
            });
            sub = "";
          } else {
            sub += el;
            // console.log(sub);
          }
        });
      } else {
        result.push({
          text: text,
          type: "Identificador",
        });
      }
    }
  }
  console.log(result);
  // Recoremos el resultado y lo agregamos en la tabla
  result.forEach((word, i) => {
    const row = document.createElement("tr");
    const token = document.createElement("td");
    const lexema = document.createElement("td");
    const number = document.createElement("td");

    token.classList.add("animate__animated");
    token.classList.add("animate__fadeInUp");
    lexema.classList.add("animate__animated");
    lexema.classList.add("animate__fadeInUp");
    number.classList.add("animate__animated");
    number.classList.add("animate__fadeInUp");

    token.innerText = word.type;
    lexema.innerText = word.text;
    number.innerText = i + 1;
    row.appendChild(token);
    row.appendChild(lexema);
    row.appendChild(number);
    table.appendChild(row);
  });

  parse(result);
}

// Syntax analyzer
function parse(result) {
  result.forEach((element, pos) => {
    switch (element.type) {
      case "Declaración":
        if (result[pos + 1].type !== "Identificador") {
          errorList.push({
            message: "Se esperaba un identificador",
            pos: pos + 1,
          });
        }
        break;
      case "Comparación/igualación":
        if (
          !["Identificador", "Número"].includes(result[pos + 1]?.type) ||
          !["Identificador", "Número"].includes(result[pos - 1]?.type)
        ) {
          errorList.push({
            message: "Se esperaba un identificador o un número",
            pos,
          });
        }
        break;
      case "Reservada":
        if (result[pos + 1]?.type !== "ParentesisIq") {
          errorList.push({
            message: "Se esperaba un parentesis de apertura",
            pos: pos + 1,
          });
        }
    }
  });

  const parentesisIz = result.filter((el) => el.type === "ParentesisIq");
  const parentesisDer = result.filter((el) => el.type === "ParentesDer");

  if (parentesisIz.length !== parentesisDer.length) {
    errorList.push({
      message: "Se esperaba un parentesis de cierre",
    });
  }
  console.log({errorList});

  if (errorList.length) {
    errorList.forEach((word, i) => {
      const row = document.createElement("tr");
      const message = document.createElement("td");
      const pos = document.createElement("td");
      const number = document.createElement("td");

      message.classList.add("animate__animated");
      message.classList.add("animate__fadeInUp");
      pos.classList.add("animate__animated");
      pos.classList.add("animate__fadeInUp");
      number.classList.add("animate__animated");
      number.classList.add("animate__fadeInUp");
      message.innerText = word.message;
      pos.innerText = word.pos || "No especificado";
      number.innerText = i + 1;
      row.appendChild(message);
      row.appendChild(pos);
      row.appendChild(number);
      tableSyntax.appendChild(row);
    });
  }
}
