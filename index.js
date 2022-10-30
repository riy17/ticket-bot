const Discord = require("discord.js")
const {
  Client,
  MessageEmbed,
  MessageActionRow,
  Collection,
  MessageButton
} = require("discord.js")
const yahya = new Client({
  intents : 32767
})
const express = require("express")
const Yahya = express()
Yahya.get("/", (yahya , YAHYA) => {
  YAHYA.send("DEV YAHYA")
})
Yahya.listen(3030, () => {
  console.log("\033[1;35m yahya started")
})
const ms = require("ms")
//====================================
process.on("unhandledRejection", error => {
  return console.log(error)
});
process.on("unhandledRejection", error => {
  return
});
process.on("unhandledRejection", error => {
  return
});
setTimeout(() => {
  if (!yahya || !yahya.user) {
    console.log("yahya Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("yahya Login")
  }
}, 3 * 1000 * 60); 

//====================================
const 𝒀𝒂𝒉𝒚𝒂 = require('./yahya.json')
yahya.setMaxListeners(0);
module.exports = yahya;
yahya.commands = new Collection();
yahya.slashCommands = new Collection();
require("./handler")(yahya);
const prefix = 𝒀𝒂𝒉𝒚𝒂.prefix;
//====================================
yahya.login(process.env.token).catch(() => {
  console.log("\033[1;31m Error In Token ..!")
})
//====================================
const db = require("pro.db")
yahya.on("interactionCreate", (YAHYA) => {
if(YAHYA.isButton())
  if (YAHYA.customId === "ticket") {
    
let op = db.get(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`)
let ii = db.get(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`)
    if (YAHYA.user.id === op) return YAHYA.reply({embeds : [
      new MessageEmbed()
      .setDescription(`**\`⛔\` | You Have An Open Ticket Here __<#${ii}>__**`)
      .setColor("#333")
    ] , ephemeral: true})
const par = db.get(`category_${YAHYA.guild.id}`) 
let role = db.get(`admin_role_${YAHYA.guild.id}`)
let y = db.add(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`, 1)
    if (y === null || y === 0) y = 1;
let yy = db.get(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`)
    const ticket = YAHYA.guild.channels.create(`ticket-${yy}`, {
         permissionOverwrites: [{
                            id: YAHYA.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: (role),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: YAHYA.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text',
  parent: (par)
}).then( async function(ch) {
      db.set(`ch_${ch.id}`, ch.id)
db.set(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`, YAHYA.user.id)
db.set(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`, ch.id) 
      let uu = db.get(`ticket_${YAHYA.message.id}_${YAHYA.guild.id}`)
db.set(`information_${YAHYA.user.id}_${ch.id}`,{
        meme: YAHYA.user.id,
        id: ch.id,
        count: uu
      })
      let embed = new MessageEmbed()
      .setDescription(`**Support will be with you shortly.
To close this ticket react with 🔒**`)
      .setColor(`#333`)
      .setThumbnail(YAHYA.guild.iconURL({ dynamic: true}))
.setAuthor(YAHYA.user.username,YAHYA.user.avatarURL({dynamic : true }))
.setTimestamp()
let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("🔒 | Close")
        .setStyle("SECONDARY")
        .setCustomId("close")
      )
      ch.send({
        embeds  : [embed],
        content : `Welcome ${YAHYA.user} To Your Ticket\nWait Support Role : <@&${role}>`,
        components : [row]
      })
YAHYA.reply({content : `Done Create Your Ticket ${ch}`, ephemeral: true})
})
  }
if (YAHYA.customId === "close") {
  if(YAHYA.isButton())
    db.delete(`ch_${YAHYA.channel.id}`)
db.delete(`oppen_${YAHYA.user.id}_${YAHYA.guild.id}`)
  db.delete(`tt_${YAHYA.guild.id}_${YAHYA.user.id}`)
  let data = db.get(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
YAHYA.channel.setName(`closed-${data.count}`)
  YAHYA.channel.permissionOverwrites.edit(data.meme, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
  YAHYA.reply({
    embeds : [
      new MessageEmbed()
      .setDescription(`Ticket Closed By ${YAHYA.user}`).setColor("#333")
    ]
  })
  setTimeout(()=> YAHYA.channel.send({
    embeds : [
      new MessageEmbed()
      .setDescription(`\`Support team ticket controls\``)
    ],
    components : [
      new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("🔓 | Open")
        .setStyle("SECONDARY")
        .setCustomId("open"),
        new MessageButton()
        .setLabel("⛔ | Delete")
        .setStyle("SECONDARY")
        .setCustomId("del")
      )
    ]
  }), 2000)
}
if (YAHYA.customId === "del") {
setTimeout(() => YAHYA.channel.delete() , ms("5s"))
  db.delete(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
  YAHYA.reply({
    embeds : [
      new MessageEmbed()
      .setDescription(`Wait To delete This Ticket`)
    ]
  })
}
  if (YAHYA.customId === "open") {
let data = db.get(`information_${YAHYA.user.id}_${YAHYA.channel.id}`)
YAHYA.channel.permissionOverwrites.edit(data.meme, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
    YAHYA.reply({
      embeds : [
        new MessageEmbed()
        .setDescription(`**Ticket Opened by ${YAHYA.user}**`)
      ]
    })
}
})
yahya.on("messageCreate", (msg) => {
  if (msg.content === prefix + "hh") {
msg.channel.delete()
}
})
yahya.on("messageCreate", async (YAHYA) => {
if (YAHYA.content.startsWith(prefix + "add")) {
    let ch = db.get(`ch_${YAHYA.channel.id}`)
    if (YAHYA.channel.id != ch) return YAHYA.reply({content : `> \`👌\` **This not a ticket**`, ephemeral: true})
let args = YAHYA.content.split(" ")[1]
if (!args) return YAHYA.reply(`**please mention user or role /id**`)
  let role = YAHYA.mentions.roles.first() || YAHYA.guild.roles.cache.get(args)
  let meme = YAHYA.mentions.users.first() || yahya.users.cache.get(args) || YAHYA.guild.members.cache.get(args)
  if (role) {
    YAHYA.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Add ${role} To Ticket**`)
     ]
   })
  }
  if (meme) {
    YAHYA.channel.permissionOverwrites.edit(meme, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Add ${meme} To Ticket**`)
     ]
   })
  }
}
})
//====================================
yahya.on("messageCreate", async (YAHYA) => {
if (YAHYA.content.startsWith(prefix + "remove")) {
let ch = db.get(`ch_${YAHYA.channel.id}`)
    if (YAHYA.channel.id != ch) return YAHYA.reply({content : `> \`👌\` **This not a ticket**`, ephemeral: true})
let args = YAHYA.content.split(" ")[1]
if (!args) return YAHYA.reply(`**please mention user or role /id**`)
  let role = YAHYA.mentions.roles.first() || YAHYA.guild.roles.cache.get(args)
  let meme = YAHYA.mentions.users.first() || yahya.users.cache.get(args) || YAHYA.guild.members.cache.get(args)
  if (role) {
    YAHYA.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Delete ${role} from Ticket**`)
     ]
   })
  }
  if (meme) {
    YAHYA.channel.permissionOverwrites.edit(meme, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });
   YAHYA.reply({
     embeds : [
       new MessageEmbed()
       .setDescription(`> \`✅\` | **Done Delete ${meme} From Ticket**`)
     ]
   })
  }
}
})