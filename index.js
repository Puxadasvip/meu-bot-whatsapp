const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('ESCANEIE O QR CODE:');
});

client.on('ready', () => {
    console.log('MENU DE OPÇÕES ATIVO! 🚀');
});

client.on('message', msg => {
    const texto = msg.body.toLowerCase();

    // 1. Saudação inicial
    if (texto === 'oi' || texto === 'ola' || texto === 'menu') {
        client.sendMessage(msg.from, 
            `Olá! Escolha uma opção abaixo:\n\n` +
            `1️⃣ - Horário de funcionamento\n` +
            `2️⃣ - Falar com o suporte\n` +
            `3️⃣ - Ver o endereço\n` +
            `4️⃣ - Cupom de desconto`
        );
    } 
    // 2. Opções do menu
    else if (texto === '1') {
        msg.reply('🕒 Nosso horário é de segunda a Domindo, das 08h às 23h.');
    } 
    else if (texto === '2') {
        msg.reply('👨‍💻 Um momento, vou avisar o Leo que você precisa de ajuda!');
    } 
    else if (texto === '3') {
        msg.reply('📍 Estamos Localizados na Rua Pastor Ezequias Ribeiro, nº 1000, Osasco/SP.');
    } 
    else if (texto === '4') {
        msg.reply('🎁 Use o cupom: LEOIPTV10 para ganhar 10% de desconto!');
    }
    // 3. SE NÃO FOR NADA DISSO (O que causou o erro antes)
    else {
        msg.reply('🤔 Não entendi. Digite *Menu* para ver as opções.');
    }
});

client.initialize();