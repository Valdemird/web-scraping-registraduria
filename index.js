const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(express.json());

const {getAnswer} = require("./questions");


const getResult = async (page) => {
    let result = await page.$('#divSec');
    const textResult = await result.evaluate((element)=> {
      const children = element.children;
      const size = Object.keys(children).length
      if(size !== 0){
        return children[2].textContent
    } else {
        //result = await page.$('#ValidationSummary1');
        //const textResult = result.evaluate((element)=> element.textContent ,result)
        //console.log(textResult);
        return "No esta registrado"
    }
    } ,result)
    return textResult;
}

const getProcuraduria = async (id,name) => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.procuraduria.gov.co/CertWEB/Certificado.aspx?tpo=1"
    );
    let identificationInput = await page.$("#txtNumID");
    await page.evaluate(
      (element, text) => (element.value = text),
      identificationInput,
      id
    );
    let questionElement = await page.$("#lblPregunta");
    let question = await page.evaluate(element => element.textContent, questionElement);
    let answerElement = await page.$("#txtRespuestaPregunta");
    const answer = getAnswer(question,id,name);
    await page.evaluate((element,answer) => element.value = answer, answerElement,answer);        
    await page.select("#ddlTipoID", "1");
    const submit = await page.$('#btnConsultar');
    await submit.click();
    await page.waitForNavigation()
    const resultText = await getResult(page);
    await page.screenshot({ path: "pruebas" + id + ".png" });
    return {name,id,result:resultText};
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

app.post("/procuraduria",async (req,res) => {
    const {people} = req.body;
    const personPromises = people.map((person) => getProcuraduria(person.id,person.name))
    Promise.all(personPromises).then((value)=>{
        console.log("ya aa")
        res.json({value})
    })
})

const port = 3000;
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})
