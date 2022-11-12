const puppeteer = require('puppeteer');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); 
const { send } = require('process');

const SESSION_FILE_PATH = './session.json';
let client;
let sessionCfg;
var stop = new Boolean(false);
var minuto = new Date();
var pasado;

const withSession = () =>{
    client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    console.log('Iniciando session...');

    client.on('ready',()=>{
       console.log('Cliente is ready!')
       listenMessage(); 
    })
    client.on('auth_failure',() => {
        console.log('**ERROR DE AUTENTICACIÓN VUELVE A GENERAR EL QR');
    })

    client.initialize();
}

const listenMessage = () =>{
    console.log('escuchando...');
    client.on('message',async (msg) => {
        const{from, to, body} = msg;
        console.log(from, to, body);
        let emisor = new String(from);
        const search = body.slice(3);
        console.log(msg.type);
        if(emisor.search("@g.us")!= -1){
            if(stop==false)
            {
                sendMessage(from,'Este mensaje es un mensaje generado por un bot, Medina en este momento no se encuentra diponible, le responderá cuando pueda');
                minuto = new Date();
                pasado = minuto.getMinutes();
                console.log("Miniuto guardado paso = ",pasado);
                stop = true;
            }else{
                minuto = new Date();
                if(minuto.getMinutes() != pasado)
                    stop = false;
            }
        }   
    })
}
const sendMessage = (to, message) => {

    client.sendMessage(to, message)
}
const withOutSession = () =>{
    const client = new Client({
        puppeteer: {
          executablePath: '/usr/bin/brave-browser-stable',
        },
        authStrategy: new LocalAuth({
          clientId: "client-one"
        }),
        puppeteer: {
          headless: false,
        }
      });
      

      
      client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
      });
      
      client.on('authenticated', (session) => {
        console.log('WHATSAPP WEB => Authenticated');
      });
      
      client.on("ready", async () => {
        console.log("WHATSAPP WEB => Ready");
      });
      client.initialize();
}

(fs.existsSync(SESSION_FILE_PATH)) ?  withSession() : withSession();