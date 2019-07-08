const Discord = require('discord.js');
const prefix = "!"
const fs = require("fs");
let komendy = require("./komendy.json")

const client = new Discord.Client();

client.on('ready', () =>
{
  console.log('Bot is ready!');
});

//---------------------------------autoranga, powitanie----------------------------

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'cześć');
  const info = member.guild.channels.find(ch => ch.name ==="informacje-i-regulamin");
  channel.send(`Witaj na serwerze, ${member}. Zapoznaj się z kanałem ${info}. Możesz też przywitać się z innymi na tym kanale`);
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
    message.reply("nie masz wystarczających uprawnień aby użyć tej komendy")
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

 function sendpic ()
 {
   message.channel.send(({file: komenda.link}))
 }

 function sendnormal ()
 {
   message.channel.send(komenda.link)
 }




let entrynazwa = command
let komenda = komendy.find(post => post.nazwa === entrynazwa)
if(komenda)
{
 if(komenda.permission === "anyone") { message.channel.send(komenda.link); return}
 if(komenda.permission === "admin") {if(check(admin) == false) return nope()}
 if(komenda.permission === "mod") {if(check(mod) == false) return nope()}
 if(komenda.permission === "swojgosc") {if(check(swojgosc) == false) return nope()}
 if(komenda.typ === "obrazek") sendpic()
 if(komenda.typ === "normal") sendnormal()
}

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
		message.reply(`Proszę udać się na kanał ${kanalsg}`)

	  }
    return
  }

//--------------------------------zwykłe--------------------------------------


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


if(command === "seba")
{
 if(check(swojgosc) == false) return nope()
 const lista = require("./seba.json");
 let output = lista[Math.floor(Math.random() * lista.length)]
 message.channel.send(({file: output.link}))
  return
}


//--------------------------dla adminów----------------------------------
  if(command==="clear")
  {
    if(check(mod) == false) return nope()
    let liczba = args [0]
    if(!liczba) return message.reply("Podaj ilość wiadomości do usunięcia")
    message.channel.bulkDelete(liczba)
    return
  }
  if(command==="ban")
  {
  if(check(admin) == false) return nope()
   let user = message.mentions.users.first()
   if (!user) return message.reply("Oznacz użytkownika, którego chcesz zbanować!")
   let member = message.guild.member(user)
   if(!member) return
   member.ban
   message.channel.send(`${member} został zbanowany, hańba Ci ${member}`)
   return
  }


  if(command==="kick")
  {
   if(check(mod) == false) return nope()
   let user = message.mentions.users.first()
   if (!user) return message.reply("Oznacz użytkownika, którego chcesz wyrzucić!")
   let member = message.guild.member(user)
   if(!member) return
   member.kick
   message.channel.send(`${member} został wyrzucony, hańba Ci ${member}`)
   return
  }


if(command==="add")
{
  if(check(mod) == false) return nope()
  let nazwa = args[0]
  let link = args[1]
  let perm = args[2]

  let stara = komendy.find(post => post.nazwa === nazwa)
  if(stara) return message.reply("Taka komenda już istnieje")

  if(!perm)
  {
    perm="swojgosc"
  }

  if(!nazwa) return message.reply("Podaj nazwę dla nowej komendy")
  if(!link) return message.reply("Podaj treść/link komendy")
  if(!perm) return message.reply("Zdefiniuj uprawnienia potrzebne do wywołania komendy [swojgosc/mod/admin]")
  if((link.endsWith(".png")) || (link.endsWith(".jpg")) || (link.endsWith(".jpeg")))
  {
  if(args[2] === "admin")
  {
    if(check(admin)==false) return message.reply("Nie możesz zarządzać komendami przeznaczonymi dla administratorów!")
  }

  if((perm==="swojgosc") || (perm==="mod") || (perm==="admin") )
  {

      komendy.push({"typ":"obrazek", "nazwa":nazwa, "link":link, "permission":perm})
      const jsonString = JSON.stringify(komendy)
      fs.writeFile('./komendy.json', jsonString, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
      })
      message.channel.send(`Dodano komendę ${nazwa}`)


    }
    else return message.reply("Nieprawidłowe polecenie")

}
else message.reply("Podaj właściwy link")
}

if (command==="delete")
{
  if(check(mod) == false) return nope()
  let nazwa = args[0]
  if(!nazwa) return message.reply("Podaj nazwę komendy do usunięcia")
  let komenda = komendy.find(post => post.nazwa === nazwa)
  if(komenda.permission === "admin")
  {
    if(check(admin)==false) return message.reply("Nie możesz zarządzać komendami przeznaczonymi dla administratorów!")
  }
  delete komenda.link
  delete komenda.typ
  delete komenda.nazwa
  delete komenda.permission
  const jsonString = JSON.stringify(komendy)
  fs.writeFile('./komendy.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
  message.channel.send(`Usunięto komendę ${nazwa}`)
}




}


});
client.login(process.env.BOT_TOKEN);
