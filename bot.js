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
    if(message.member.roles.has(admin.id) || message.member.roles.has(swojgosc.id))
    {
      message.channel.send("Pamiętaj, by korzystać z bota musisz mieć rangę Swój Gość\nLista komend dla wszystkich:\n!help - wyświetla wszystkie komendy\n!facebook - link do facebooka GWD\n!grupa - link do grupy Astronomia Polska\n!meteo - link do grupy meteorologia-polska\n!stellarium - link do programu stellarium\n!swiatlo - link do lightpollutionmap\n!zjawisko - wyświetla dzisiejsze zjawisko astronomiczne\n   \n Komendy dla administracji:\n!swojgosc - info na temat rangi Swój Gość\n!randomuser - wybiera losowego użytkownika serwera\n!clearchannel [ilość wiadomości/max 100] - usuwa daną ilość wiadomości z kanału")
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!")
  }


  if(command === "facebook")
  {
    if(message.member.roles.has(swojgosc.id) || message.member.roles.has(admin.id))
    {
      message.channel.send("Facebook Gwiazdy w Dłoniach: https://www.facebook.com/gwiazdywdloniach");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "grupa")
  {
    if(message.member.roles.has(swojgosc.id) || message.member.roles.has(admin.id))
    {
      message.channel.send("Wpadnij na grupę Astronomia-Polska: https://www.facebook.com/groups/astronomiapolska");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "meteo")
  {
    if(message.member.roles.has(swojgosc.id) || message.member.roles.has(admin.id))
    {
      message.channel.send("Grupa Meteorologia-Polska: https://www.facebook.com/groups/meteopolska");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "stellarium")
  {
    if(message.member.roles.has(swojgosc.id) || message.member.roles.has(admin.id))
    {
      message.channel.send("Interaktywna mapa nieba: https://stellarium.org");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "swiatlo")
  {
    if(message.member.roles.has(swojgosc.id) || message.member.roles.has(admin.id))
    {
      message.channel.send("Mapa zanieczyszczenia światłem: https://www.lightpollutionmap.info/");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "swojgosc")
  {
    if(message.member.roles.has(admin.id))
    {
      message.channel.send("Ranga Swój Gość oznacza, że jesteś zweryfikowanym użytkownikiem naszego discorda. Umożliwi Ci zmianę własnego pseudonimu, umieszczanie linków oraz załączanie plików, a także uczestnictwo w kanłach głosowych oraz korzystanie z bota.\nMożesz ją uzyskać na dwa sposoby \n 1)Wysyłając nam prywatną wiadomość na facebooku https://www.facebook.com/gwiazdywdloniach\n2)Wysyłając do kogoś z administracji prywatną wiadomość discord, z linkiem do swojego profilu na facebooku");
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!");
  }

  if(command === "randomuser")
  {
    if(message.member.roles.has(admin.id))
    {
      const member = message.guild.members.random()
      message.channel.send(`Wybieram ${member}!`);
    }
    else message.reply("Nie masz uprawnieńby użyć tej komendy!")
  }


  if(command === "zjawisko")
  {
    if(message.member.roles.has(admin.id) || message.member.roles.has(swojgosc.id))
    {
      message.channel.send("Komenda nieaktywna, trzeba ogranąć listę zjawisk :D")
      return
      const plik = require("./zjawiska.json");
      let dzisiaj = new Date();
      let dzien = dzisiaj.getDate();
      let miesiac = dzisiaj.getMonth()+1;
      dzisiaj = dzien + "/" + miesiac;
      let entry = plik.find(post => post.data === dzisiaj)
      if(!entry) return message.channel.send("Brak zjawisk na dziś :(");
      message.channel.send(`Dziś na niebie: ${entry.nazwa}`)

    }
    else message.reply("Nie masz uprawnieńby użyć tej komendy!")
  }



  if(command === "clearchannel")
  {
    if(message.member.roles.has(admin.id))
    {
      let ilosc = args[0];
      if(!ilosc) return message.channel.send("Podaj ilość wiadomości do usunięcia")
      message.channel.bulkDelete(ilosc);
    }
    else message.reply("Nie masz uprawnień by użyć tej komendy!")
  }


}
else
{
  if(message.content.includes("kurwa"))
  {
    message.delete();
    message.reply("Nie używaj wulgaryzmów!")
  }

  if(message.content.includes("chuj"))
  {
    message.delete();
    message.reply("Nie używaj wulgaryzmów!")
  }

  if(message.content.includes("jeba"))
  {
    message.delete();
    message.reply("Nie używaj wulgaryzmów!")
  }

  if(message.content.includes("kutas"))
  {
    message.delete();
    message.reply("Nie używaj wulgaryzmów!")
  }

  if(message.content.includes("pierdol"))
  {
    message.delete();
    message.reply("Nie używaj wulgaryzmów!")
  }
}






















});


client.login(process.env.BOT_TOKEN);
