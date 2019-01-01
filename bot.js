const Discord = require('discord.js');
const prefix = "!"
const fs = require("fs");

const client = new Discord.Client();

client.on('ready', () =>
{
  console.log('Bot is ready!');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'cześć');
  if (!channel) return;
  channel.send(`Witaj na serwerze, ${member}`);
  const czlonek = member.guild.roles.find(role => role.name === "Członek");
  member.addRole(czlonek.id)
});


client.on("message", message => {
if(message.author.bot) return;
if(message.content.startsWith(prefix))
{
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const swojgosc = message.guild.roles.find(role => role.name ==="Swój Gość");
  const admin = message.guild.roles.find(role => role.name === "*administrator*");

  if(command === "help")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      const kanal = message.guild.channels.find(ch =>  ch.name === "uzyskaj-rangę")
      message.channel.send(`Pamiętaj, aby korzystać z bota, musisz posiadać rangę Swój Gość (info pod komendą !swojgosc)\nKomendy dla wszystkich:\n!help - wyświetla listę komend oraz ich przeznaczenie\n!facebook - wyświetla link do facebooka GWD\n!grupa - wyświetla link do grupy Astronomia-Polska\n!meteo - wyświetla link do grupy meteorologia-polska\n!stellarium - link do programu stellarium\n!swiatlo - link do lightpollutionmap\n!swojgosc(dostępna dla nieposiadających tej rangi) - informacje na temat rangi Swój Gość\n!randomuser - wybiera losowego użytkownika serwera\n!zjawisko - wyświetla dzisiejsze zjawisko astronomiczne\n!zjawisko [dzień/miesiac/rok] - wyświetla zjawisko na dany dzień\n!ranga [link do Twojego facebooka] - dostępna tylko na kanale ${kanal}, użyj jej jeśli chcesz uzyskać rangę Swój Gość\n\nKomendy dla administratorów:\n!clearchannel [liczba] - usuwa daną ilość wiadomości z kanału\n!ban [oznacz użytkownika] - chyba nie trzeba wyjaśniać\n!kick [oznacz użytkownka] - wyrzuca (nie banuje) danego użytkownika)
      `)
    }
  }


  if(command === "facebook")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      message.channel.send("Facebook Gwiazdy w Dłoniach: https://www.facebook.com/gwiazdywdloniach");
    }
  }

  if(command === "grupa")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      message.channel.send("Wpadnij na grupę Astronomia-Polska: https://www.facebook.com/groups/astronomiapolska");
    }
  }

  if(command === "meteo")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      message.channel.send("Grupa Meteorologia-Polska: https://www.facebook.com/groups/meteopolska");
    }
  }

  if(command === "stellarium")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      message.channel.send("Interaktywna mapa nieba: https://stellarium.org");
    }
  }

  if(command === "swiatlo")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      message.channel.send("Mapa zanieczyszczenia światłem: https://www.lightpollutionmap.info/");
    }
  }

  if(command === "swojgosc")
  {
      const kanal = message.guild.channels.find(ch => ch.name === "uzyskaj-rangę")
      message.channel.send(`Ranga Swój Gość oznacza, że jesteś zweryfikowanym użytkownikiem naszego discorda. Umożliwi Ci zmianę własnego pseudonimu, umieszczanie linków oraz załączanie plików, a także uczestnictwo w kanłach głosowych oraz korzystanie z bota.\nAby ją uzyskać, użyj komendy !ranga [link do Twojego facebooka] na kanale ${kanal}`);
  }

  if(command === "randomuser")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      const member = message.guild.members.random()
      message.channel.send(`Wybieram ${member}!`);
    }
  }


 if(command === "zjawisko" || command==="zjawiska")
  {
    let data = args[0]
    if (!data)
    {
     if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
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
    }
  else
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
     {
       const plik = require("./zjawiska.json");
       let entry = plik.find(post => post.data === data);
       if(!entry) return message.channel.send("Brak zjawisk na ten dzień");
       message.channel.send(`Dnia ${data} nastąpi: ${entry.nazwa}`)
     }
  }
  }



  if(command === "clearchannel")
  {
    if(!message.member.roles.has(admin.id)) return message.reply("Ta komenda jest dostępna tylko dla administratorów")
    {
      let ilosc = args[0];
      if(!ilosc) return message.channel.send("Podaj ilość wiadomości do usunięcia")
      message.channel.bulkDelete(ilosc);
    }
  }

  if(command === "ranga")
  {
    const kanal0 = message.guild.channels.find(ch => ch.name ==="uzyskaj-rangę")
    if(message.channel === kanal0)
	   {
      if(message.member.roles.has(swojgosc.id)) return message.reply("Już posiadasz rangę Swój Gość")
      const link = args[0]
      const autor = message.author
      const slawek = client.users.find(user => user.username == "Sławomir");
      const kubaw = client.users.find(user => user.username == "Kuba Wesolek");
      if(kubaw.presence.status == "online")
	 {
	 kubaw.send(`Gość do weryfikacji, ${link} , nick: ${autor}`);
   message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
         return
	 }
      if(slawek.presence.status == "online")
	      {
		      slawek.send(`Gość do weryfikacji, ${link} , nick: ${autor}`);
          message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
		      return
	      }
      kubaw.send(`Gość do weryfikacji, ${link}, nick ${autor}`);
      message.reply("Administratorzy zostali powiadomieni, niedługo otrzymasz rangę")
	   }



	  else
	  {
		  message.reply(`Proszę udać się na kanał ${kanal0}`)
	  }
  }

  if(command==="ban")
  {
    if(!message.member.roles.has(admin.id)) return message.reply("Ta komenda jest dostępna tylko dla administratorów")
    let user = message.mentions.members.first()
    user.ban
  }

  if(command === "kick")
  {
    if(!message.member.roles.has(admin.id)) return message.reply("Ta komenda jest dostępna tylko dla administratorów")
    let user = message.mentions.members.first()
    user.kick
  }

}






















});

client.login(process.env.BOT_TOKEN);
