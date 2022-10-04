const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.
​
const agent = session(app);
​
describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });
​
  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });
​
  describe("POST /sum", () => {
    it("responds with 200", () =>
      agent.post("/sum").send({ a: 1, b: 1 }).expect(200));
    it("responds with 400", () =>
      agent.post("/sum").send({ b: 3 }).expect(400));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });
​
  describe("POST /producto", () => {
    it("responds with 200", () =>
      agent.post("/product").send({ a: 1, b: 1 }).expect(200));
    it("responds with 400", () =>
      agent.post("/product").send({ b: 3 }).expect(400));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });
  /*
  El test de la ruta sumArray está incompleto. Falta testar por el caso que 
  devuelva false. También falta testear que no sumen dos veces el mismo 
  número para encontrar el resultado.
  */
​
  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [20], num: 1 })
        .expect(200));
    it("responds with 400", () => agent.post("/sumArray").expect(400));
    it("responds with true if sumArray is equal num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("responds with false if sumArray not is equal num", () =>
      agent
        .post("/sumArray")
        .send({ array: [10, 11, 15, 20], num: 14 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it("responds with false if sumArray (not sum mismo num) not is equal num", () =>
      agent
        .post("/sumArray")
        .send({ array: [10, 11, 15], num: 20 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });
​
  /*
()
Vamos a crear un endpoint /numString que reciba un string y devuelva el 
número de caracteres que tiene ese string. Primero vamos a escribir los tests, 
y luego codear para que pasen: Nuestro nuevo endpoint deberia:
Responder con status 200.
Responder con 4 si enviamos 'hola'.
Responder con un status 400 (bad request) si el string es un número.
Responder con un status 400 (bad request) si el string esta vacio.
*/
  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ string: "ok" }).expect(200));
    it("responds with 400", () => agent.post("/numString").expect(400));
    it("responds with 400", () =>
      agent.post("/numString").send({ string: "" }).expect(400));
    it("responds with 400", () =>
      agent.post("/numString").send({ string: 7 }).expect(400));
    it("responds with 4 if string is 'hola", () =>
      agent
        .post("/numString")
        .send({ string: "hola" })
        .then((res) => {
          expect(res.body.result).toEqual(4);
        }));
  });
  /*
Pluck
Vamos a crear un endpoint /pluck que reciba un arreglo de objetos y un 
nombre de una propiedad y devuelva un arreglo sólo con los valores de esa propiedad.
​
array [{casa:1,ventana:4},{casa:7,ventana:7},{casa:9,ventana:99}]
casa [1,7,9]
Nuestro nuevo endpoint deberia:
Responder con status 200.
Responder con al funcionalidad del pluck.
Responder con un status 400 (bad request) si array no es un arreglo.
Responder con un status 400 (bad request) si el string propiedad está vacio.
  */
  describe("POST /pluck", () => {
    let arr = [{casa:1,ventana:4},{casa:7,ventana:7},{casa:9,ventana:99}]
    it("responds with 200", () =>
      agent.post("/pluck").send({ array:arr, string: "casa" }).expect(200));
    it("responds with 400", () => agent.post("/pluck").expect(400));
    it("responds with 400", () =>
      agent.post("/pluck").send({  array:arr, string: "" }).expect(400));
    it("responds with 400", () =>
      agent.post("/pluck").send({ array:6, string: "casa" }).expect(400));
    it("responds with [1,7,9] if string is 'casa", () =>
      agent
        .post("/pluck")
        .send({ array:arr, string: "casa" })
        .then((res) => {
          expect(res.body.result).toEqual([1,7,9]);
        }));
  });
}); 