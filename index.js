const Discord = require("discord.js");
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});
// debes que tener los intents activados en discord developer portal
const config = required("./config.json");
const Canvas = required("canvas"); 
// se instala con npm i canvas 
const nofecth = require("node-superfetch");


client.on("guildMemberAdd", async member => {
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")
    var img = "https://i.imgur.com/UOkDSnW.jpeg"; // link de imagen
    var mensaje = "Hola $nuevousuario$ y bienvenido a $servidor$"; // Mensaje $nuevousuario$ es para la mencion del usuario y $servidor$ es para el nombre del servidor
    var canal = "bienvenidas"; // Nombre del canal lo puedes cambiar para el que quieras
    mensaje = mensaje.replace("$nuevousuario$", member); // Cambia $nuevousuario$ por la mencion al usaurio
    mensaje = mensaje.replace("$servidor$", member.guild.name) // Cambia $servidor$ por el nombre del servidor
    if (img) {
        const {body: b} = await nofecth.get(img);
        const fondo = await Canvas.loadImage(b)
        ctx.drawImage(fondo, 0, 0, 700, 250);
    }
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`${member.displayName}`, 225, canvas.height / 1.8)
    
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
    ctx.closePath();
    ctx.clip();
    const {body: buffer} = await nofecth.get(member.user.displayAvatarURL({format: "png", dynamic: true}));
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const final = new Discord.MessageAttachment(canvas.toBuffer(), "img.png");
    member.guild.channels.cache.find(c => c.name == canal).send(mensaje, final) // se obtine el canal y se manda el mensaje y la imagen que la llamamos final 
})
