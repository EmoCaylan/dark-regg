const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);


client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.channel.send(`ム`)
});    

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`ム`)
});   
client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send(`ム`)
});

//-----------------------GİRENE-ROL-VERME----------------------\\     
let kayıtsız = ayarlar.kayıtsızrol

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
});

//-----------------------GİRENE-ROL-VERME SON----------------------\\     


client.on("ready", async () => { 
let botVoiceChannel = client.channels.cache.get("832366081170735163"); 
if (botVoiceChannel) 
botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

client.on("guildMemberAdd", async member => {
  let member2 = member.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  var user = member2;
  var takizaman = [];
  if (zaman < 604800000) {
    takizaman = 'uygun deilsin! <a:arp:832376394821795861>';
  } else {
    takizaman = 'uygunsun! <a:pembetik:832366829695270912>';
  }
  require("moment-duration-format");
  let zaman1 = new Date().getTime() - user.createdAt.getTime();
  const gecen = moment
    .duration(zaman1)
    .format(
      ` YY **[Yıl,]** DD **[Gün,]****`
    );
  let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`);
  let message = member.guild.channels.cache.get('832366079178440718');
var alpsı =
`:tada: Sunucumuza hoşgeldin, ${member}

Hesabınız **${gecen}** tarihinde oluşturulmuş. Kayıt olmaya **${takizaman}**

Sunucu kurallarımız <#832366079615434768> kanalında belirtilmiştir, Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Seninle beraber **${message.guild.memberCount}** kişi olduk, tagımızı (**ム**) alarak bizlere destek olabilirsin! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor. <@&832366079124439045> seninle ilgilenecektir İyi eğlenceler.
`
  message.send(alpsı);
  message.send('832366079178440718').then(x => x.delete({timeout: 1}));
});  


  
//-----------------------HOŞ-GELDİN-MESAJI SON----------------------\\     


//-----------------------TAG-ROL-LOG----------------------\\  
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'ム'
  const sunucu = '832366078943559690'
  const log = '832366086812729404'
  const rol = '832366079116443649'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Kazandı`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Kaybetti`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
}
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
//-----------------------TAG-ROL-LOG-SON----------------------\\  