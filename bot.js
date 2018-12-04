const Discord = require('discord.js');
const prefix = "!"
const fs = require("fs");

const client = new Discord.Client();

client.on('ready', () =>
{
  console.log('Bot is ready!');
});

client.on("guildMemberAdd", member => {

  const channel =  member.guild.channel.find(ch => ch.name === "cześć");
  channel.send(`Witaj na serwerze,${member}`);
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
      message.channel.send("Pamiętaj, by korzystać z bota musisz mieć rangę Swój Gość\nLista komend dla wszystkich:\n!help - wyświetla wszystkie komendy\n!facebook - link do facebooka GWD\n!grupa - link do grupy Astronomia Polska\n!meteo - link do grupy meteorologia-polska\n!stellarium - link do programu stellarium\n!swiatlo - link do lightpollutionmap\n!zjawisko - wyświetla dzisiejsze zjawisko astronomiczne\n   \n Komendy dla administracji:\n!swojgosc - info na temat rangi Swój Gość\n!randomuser - wybiera losowego użytkownika serwera\n!clearchannel [ilość wiadomości/max 100] - usuwa daną ilość wiadomości z kanału")
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
      message.channel.send("Ranga Swój Gość oznacza, że jesteś zweryfikowanym użytkownikiem naszego discorda. Umożliwi Ci zmianę własnego pseudonimu, umieszczanie linków oraz załączanie plików, a także uczestnictwo w kanłach głosowych oraz korzystanie z bota.\nMożesz ją uzyskać na dwa sposoby \n 1)Wysyłając nam prywatną wiadomość na facebooku https://www.facebook.com/gwiazdywdloniach\n2)Wysyłając do kogoś z administracji prywatną wiadomość discord, z linkiem do swojego profilu na facebooku");
  }

  if(command === "randomuser")
  {
    if(!message.member.roles.has(swojgosc.id)) return message.reply("Tylko użytkownicy posiadający rangę Swój gość mogą używać bota. Więcej informacji pod komendą !swojgosc")
    {
      const member = message.guild.members.random()
      message.channel.send(`Wybieram ${member}!`);
    }
  }


 if(command === "zjawisko" || "zjawiska")
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
}





















});


client.login(process.env.BOT_TOKEN);
