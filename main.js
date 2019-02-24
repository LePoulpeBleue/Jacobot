const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const ytdl = require('ytdl-core');
 
const adapter = new FileSync('Database.json')
const db = low(adapter)

db.defaults({
    userStats : [], messages : []
})
.write()

bot.on('ready', () => {
    bot.user.setPresence({game: {name: 'dabbé'}})
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {

  if (message.author.bot) return;
  var strmessage = message.content.toLowerCase();
  const basicLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Basic");
  const blueLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Blue");
  const prisonnierLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Prisonnier");
  const fortniteLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Fortnite");
  const rainbowLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Rainbow");
  const supremeLama = message.guild.emojis.find(emoji => emoji.name === "Lama_Supreme");

    db.get("messages").push({Autheur: message.author.username, AutheurID: message.author.id, Message: message.content, Date: new Date()}).write();

    if(!db.get('userStats').find({user: message.author.username}).value()){
        db.get('userStats').push({user: message.author.username, coin: 10, basicLama: 1, blueLama: 0, prisLama: 0, fortniteLama: 0, rainbowLama: 0, supremeLama: 0}).write();
    }else{
        var userlamadb = db.get("userStats").filter({user: message.author.username}).find('basicLama').value();
        console.log('\x1b[32m%s\x1b[0m',userlamadb);
        var userlama = Object.values(userlamadb)
        console.log(userlama);
        db.get("userStats").find({user: message.author.username}).assign({user: message.author.username, basicLama: userlama[2] += 1}).write();
    }
    if(strmessage.includes("jacob")){
      var replymessage = ["Oui.", "Non.", "Peut-être.", "Je ne sais pas."];
      message.channel.send(replymessage[getRandomInt(3)]);
    }
    if(strmessage.startsWith(".ping")){
      message.channel.send(({embed: {
        color: 0x2ed32e,
        fields: [{
            name: "PING :",
            value: "Le ping est de : " + Math.round(bot.ping) + ' ms.'
      }
     ],
     }
    }));
    }
    if(strmessage.startsWith(".time")){
      var temps = new Date();
      var heure = temps.getHours();
      var minute = temps.getMinutes();
      var seconde = temps.getSeconds();
      var milliseconde = temps.getMilliseconds();
      message.channel.send({embed: {
          color: 0,
          author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
          },
          title: "HEURE :",
          description: "Il est :",
          fields: [
              {
                  name: "Heure",
                  value: heure + 1
              },
              {
                  name: "Minute",
                  value: minute
              },
              {
                  name: "Seconde",
                  value: seconde
              },
              {
                name: "Milliseconde",
                value: milliseconde
              }
          ],
          timestamp: new Date(),
          footer: {
              icon_url: bot.user.avatarURL,
              text: "© Jacob"
            }
      }
    })
      console.log(heure, minute, seconde);
    }
    if(strmessage.startsWith("pierre")){
      var luck = getRandomInt(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("J'ai perdu ;-;");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("Égalité.");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("J'ai Gagné :D");
      }
    }
    if(strmessage.startsWith("feuille")){
      var luck = getRandomInt(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("J'ai Gagné :D");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("J'ai perdu ;-;");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("Égalité.");
      }
    }
    if(strmessage.startsWith("ciseau")){
      var luck = getRandomInt(3);
      if(luck === 0){
        message.channel.send("Ciseau!");
        message.channel.send("Égalité.");
      }
      if(luck === 1){
        message.channel.send("Pierre!");
        message.channel.send("J'ai Gagné :D");
      }
      if(luck === 2){
        message.channel.send("Feuille!");
        message.channel.send("J'ai perdu ;-;");
      }
    }
    if(strmessage.startsWith("bonjour" || "coucou" || "cc" || "slt" || "bjr" || "hello")){
      message.reply("Bonjour.");
    }
    if (message.isMentioned(bot.user)) {
      message.channel.send('⣿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿\n⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿\n⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹\n⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼\n⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺\n⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾\n⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺\n⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫\n⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿\n⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿\n⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽\n⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿\n⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾\n⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲\n⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼\n⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼\n⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸\n⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻\n⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿')
    }
    if(strmessage.startsWith(".google")){
        const args = message.content.slice(8).trim().split();
        message.channel.send("http://www.google.com/search?q=" + args + "&btnI");
    }
    if(strmessage.startsWith(".ytb")){
        const args = message.content.slice(5).trim().split();
        message.channel.send("http://www.google.com/search?q=Youtube+" + args + "&btnI");
    }
    if(strmessage.startsWith(".pp")){
        const args = message.content.slice(4).trim().split();
        bot.user.setAvatar(args.toString());
        message.channel.send("C'est fait! :D")
    }
    if(strmessage.startsWith(".pseudo")){
        const args = message.content.slice(8).trim().split();
        message.guild.members.get(bot.user.id).setNickname(args.toString());
        message.channel.send("C'est fait! :D");
        message.channel.send("Mon nouveau pseudo est : " + args);
    }
    if(strmessage.startsWith(".activité")){
        const args = message.content.slice(10).trim().split();
        bot.user.setActivity(args.toString());
        message.channel.send("C'est fait! :D");
        message.channel.send("Ma nouvelle activiter est : " + args);
    }
    if(strmessage === ".jacob"){
        bot.user.setAvatar("https://image.noelshack.com/fichiers/2019/06/6/1549718750-deepjacobicon.png");
        message.guild.members.get(bot.user.id).setNickname("Jacob");
        bot.user.setActivity("dabbé");
    }
    if(strmessage === ".clean"){
        message.channel.fetchMessages().then(function(list){
            message.channel.bulkDelete(list);
            message.channel.send("Channel nettoyer :D");
        })
    }
    if(strmessage === ".help"){
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            title: "HELP :",
            description: "Les commande disponnible son ecrite ici.",
            fields: [{
                name: ".help",
                value: "Pour afficher toute les commandes disponible."
              },
              {
                name: ".google",
                value: "Pour une recherche google du pauvre."
              },
              {
                name: ".ytb",
                value: "Pour une recherche youtube du pauvre."
              },
              {
                name: ".pp",
                value: "Pour changer ma photo de profile c: ."
              },
              {
                name: ".pseudo",
                value: "Pour changer mon pseudo c: ."
              },
              {
                name: ".activité",
                value: "Pour changer mon activité c: ."
              },
              {
                name: ".jacob",
                value: "Pour me remettre a zero."
              },
              {
                name: ".clean",
                value: "Pour clean le chat et tout les truc douteux."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Jacob"
            }
          }
        });
    }

});

bot.login(process.env.BOT_TOKEN);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
