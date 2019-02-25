const Discord = require('discord.js');
const prefix = "!"
const fs = require("fs");

const client = new Discord.Client();

client.on('ready', () =>
{
  console.log('Bot is ready!');
});

//---------------------------------autoranga, powitanie----------------------------

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'cześć');
  const ogloszenia = member.guild.channels.find(ch => ch.name ==="ogłoszenia");
  channel.send(`Witaj na serwerze, ${member}. Zapoznaj się z kanałem ${ogloszenia}`);
  const czlonek = member.guild.roles.find(role => role.name === "Członek");
  member.addRole(czlonek.id)
});

//---------------------------------komendy------------------------------------

client.on("message", message => {
if(message.author.bot) return;
	
if(message.content.includes("piwo" || "Piwo"))
   {

    let user = message.author
    message.channel.send(`No, ${user}, też bym się napił :beer:`)
	   return
   }

if(message.content.startsWith(prefix))
{
  const admin = message.guild.roles.find(role => role.name === "*administrator*");
  const swojgosc = message.guild.roles.find(role => role.name ==="Swój Gość");
  const mod = message.guild.roles.find(role =>role.name==="Moderator");
  const kanalsg = message.guild.channels.find(ch => ch.name === "uzyskaj-rangę")

  function check (rank)
  {
    let result = message.member.roles.has(rank.id)
    return result
  }

  function nope ()
  {
    message.reply(`Tylko użytkownicy z rangą Swój Gość mogą używać bota. Aby uzyskać tę rangę, użyj komendy !ranga na kanale ${kanalsg}`)
  }

  function nopeadmin()
  {
    message.reply("Ta komenda jest dostępna tylko dla administratorów")
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

//-------------------------------dla nowych------------------------------------

  if(command === "swojgosc")
  {
      message.channel.send(`Ranga Swój Gość oznacza, że jesteś zweryfikowanym użytkownikiem naszego discorda. Umożliwi Ci zmianę własnego pseudonimu, umieszczanie linków oraz załączanie plików, a także uczestnictwo w kanłach głosowych oraz korzystanie z bota.\nAby ją uzyskać, użyj komendy !ranga na kanale ${kanalsg}`);
      return
  }

  if(command === "ranga")
  {
    const kanal0 = message.guild.channels.find(ch => ch.name ==="uzyskaj-rangę")
    if(message.channel === kanal0)
	   {
      if(message.member.roles.has(swojgosc.id)) return message.reply("Już posiadasz rangę Swój Gość")
      const autor = message.author
      const slawek = client.users.find(user => user.username == "Sławomir");
      const kubaw = client.users.find(user => user.username == "Kuba Wesolek");
      if(kubaw.presence.status == "online")
	 {
	 kubaw.send(`Gość do weryfikacji, nick: ${autor}`);
   message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
         return
	 }
      if(slawek.presence.status == "online")
	      {
		      slawek.send(`Gość do weryfikacji, nick: ${autor}`);
          message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
		      return
	      }
      kubaw.send(`Gość do weryfikacji, nick ${autor}`);
      message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
	   }



	  else
	  {
		  message.reply('Invalid command')
  .then(msg => {
    msg.delete(10000)
  })
  })
	  }
    return
  }

//--------------------------------zwykłe--------------------------------------

  if(command === "help")
  {
    if(check(swojgosc) == false) return nope()
      const kanal = message.guild.channels.find(ch =>  ch.name === "uzyskaj-rangę")
      message.channel.send(`Pamiętaj, aby korzystać z bota, musisz posiadać rangę Swój Gość (info pod komendą !swojgosc)\nKomendy dla wszystkich:\n!help - wyświetla listę komend oraz ich przeznaczenie\n!facebook - wyświetla link do facebooka GWD\n!grupa - wyświetla link do grupy Astronomia-Polska\n!meteo - wyświetla link do grupy meteorologia-polska\n!stellarium - link do programu stellarium\n!swiatlo - link do lightpollutionmap\n!swojgosc(dostępna dla nieposiadających tej rangi) - informacje na temat rangi Swój Gość\n!randomuser - wybiera losowego użytkownika serwera\n!zjawisko - wyświetla dzisiejsze zjawisko astronomiczne\n!zjawisko [dzień/miesiac/rok] - wyświetla zjawisko na dany dzień\n!ranga [link do Twojego facebooka] - dostępna tylko na kanale ${kanal}, użyj jej jeśli chcesz uzyskać rangę Swój Gość\n\nKomendy dla administratorów:\n!clear [liczba] - usuwa daną ilość wiadomości z kanału\n!ban [oznacz użytkownika] - chyba nie trzeba wyjaśniać\n!kick [oznacz użytkownka] - wyrzuca (nie banuje) danego użytkownika)
      `)
      return
  }


  if(command === "facebook")
    {
          if(check(swojgosc) == false) return nope()
      message.channel.send("Facebook Gwiazdy w Dłoniach: https://www.facebook.com/gwiazdywdloniach");
return
    }

  if(command === "grupa")
  {
        if(check(swojgosc) == false) return nope()
      message.channel.send("Wpadnij na grupę Astronomia-Polska: https://www.facebook.com/groups/astronomiapolska");
return
  }

  if(command === "meteo")
  {
        if(check(swojgosc) == false) return nope()
      message.channel.send("Grupa Meteorologia-Polska: https://www.facebook.com/groups/meteopolska");
return
  }

  if(command === "stellarium")
    {
          if(check(swojgosc) == false) return nope()
      message.channel.send("Interaktywna mapa nieba: https://stellarium.org");

  return  }

  if(command === "swiatlo")
  {
        if(check(swojgosc) == false) return nope()
      message.channel.send("Mapa zanieczyszczenia światłem: https://www.lightpollutionmap.info/");
return
  }

  if(command === "randomuser")
  {
        if(check(swojgosc) == false) return nope()
      const member = message.guild.members.random()
      message.channel.send(`Wybieram ${member}!`);
return
  }


 if(command === "zjawisko" || command==="zjawiska")
  {
        if(check(swojgosc) == false) return nope()
    let data = args[0]
    if (!data)
    {
      const lista = require("./zjawiska.json");
      let dzisiaj = new Date();
      let dzien = dzisiaj.getDate();
      let miesiac = dzisiaj.getMonth()+1;
      let rok = dzisiaj.getFullYear();
      dzisiaj = dzien + "/" + miesiac + "/" + rok;
      let entry = lista.find(post => post.data === dzisiaj)
      if(!entry) return message.channel.send("Brak zjawisk na dziś :(");
      message.channel.send(`Dziś na niebie: ${entry.nazwa}`)
     }
  else
  {
       const plik = require("./zjawiska.json");
       let entry = plik.find(post => post.data === data);
       if(!entry) return message.channel.send("Brak zjawisk na ten dzień");
       message.channel.send(`Dnia ${data} nastąpi: ${entry.nazwa}`)
  }
  return
  }

if(command === "elon")
{
      if(check(swojgosc) == false) return nope()
  message.channel.send({
      file: "https://i.imgur.com/O0JU8mH.jpg"
  });
  return
}

if(command === "ksiezyc")
{
      if(check(swojgosc) == false) return nope()
  message.channel.send({
    file: "https://i.imgur.com/jO5xbDr.jpg"
  });
  return
}


//--------------------------dla adminów----------------------------------
  if(command==="clear")
  {
    if(check(mod) == false) return nopeadmin()
    let liczba = args [0]
    if(!liczba) return message.reply("Podaj ilość wiadomości do usunięcia")
    message.channel.bulkDelete(liczba)
    return
  }

  if(command==="ban")
  {
        if(check(admin) == false) return nopeadmin()
   let user = message.mentions.users.first()
   if (!user) return message.reply("Oznacz użytkownika, którego chcesz zbanować!")
   let member = message.guild.member(user)
   if(!member) return
   member.ban
   message.channel.send(`${member} został zbanowany, hańba Ci ${member}`)
   return
  }

  if(!command==="kick")
  {
        if(check(mod) == false) return nopeadmin()
  let user = message.mentions.users.first()
  if (!user) return message.reply("Oznacz użytkownika, którego chcesz wyrzucić!")
  let member = message.guild.member(user)
  if(!member) return
  member.kick
  message.channel.send(`${member} został wyrzucony, hańba Ci ${member}`)
  return
  }












}













});
client.login(process.env.BOT_TOKEN);
