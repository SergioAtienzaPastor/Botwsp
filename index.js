const puppeteer = require('puppeteer');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); 
const { send } = require('process');

const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;

const withSession = () =>{
    console.log('Iniciando session...');
    sessionData = require(SESSION_FILE_PATH);
    client = new Client({ 
        session:sessionData
    })

    client.on('ready',()=>{
       console.log('Cliente is ready!')
       listenMessage(); 
    })
    client.on('auth_failure',() => {
        console.log('**ERROR DE AUTENTICACIÓN VUELVE A GENERAR EL QR');
    })

    client.initialize();
}
//Esta función escucha cada vez que se recibe un mensaje
const listenMessage = () =>{
    console.log('escuchando...');
    client.on('message',(msg) => {
        const{from, to, body} = msg;
        console.log(from, to, body);
        let emisor = new String(from);
        if(emisor.search("-1594581190@g.us")!= -1 || emisor.search("-1586135781@g.us"))
        {
                if(body.search('-help')!=-1)
                {
                    sendMessage(from, 'Hola, a continuación se muestra el uso del bot\n -x [Nombre Pelicula][Dia] // Para buscar horarios en el Xmadrid\n -t [Nombre Pelicula][Dia] // Para buscar horarios en el TresAguas\n -k [Nombre Pelicula][Dia] // Para buscar horarios en el Kinepolis');
                }else if(body.search("-x")!=-1)
                {
                    sendMessage(from, 'Buscando información Xmadrid...');
                    sendMessage(from, 'https://www.ocineurbanxmadrid.es');
                }else if(body.search("-t")!=-1)
                {
                    sendMessage(from, 'Buscando información TresAguas...');
                    //searchBrowser('https://cine.entradas.com/cine-alcorcon/yelmo-cines-tresaguas/shows/movies?ref=738&mode=widget&change=0');
                    sendMessage(from, 'https://cine.entradas.com/cine-alcorcon/yelmo-cines-tresaguas/shows/movies?ref=738&mode=widget&change=0');
                }else if(body.search("-k")!=-1){
                    sendMessage(from, 'Buscando información Kinepolis...');
                    sendMessage(from, 'https://kinepolis.es/?main-section=presales');
                }
        }
        return ;
    })
}

const sendMessage = (to, message) => {

    client.sendMessage(to, message)
}

//Consultar Web
const searchBrowser = async(url) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto(url);

}
//Genera código QR
const withOutSession = () =>{
    console.log('No tenemos session guardada');
    client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    client.on('authenticated', (session) =>{
        //Guardamos credenciales de session
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err){
            if(err){
                console.log(err);
            }
        });
    });
    client.initialize();
}

(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();
