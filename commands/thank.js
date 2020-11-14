const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "thank",
    description: "check how much invites someone has",
    example: "!invites @Seeked and !invites",
    

    async run (client, message, args){

        const user = message.mentions.users.first()

        const times = db.get(`thanked_${message.author.id}`)

        const nuser = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s thankings`)
        .setDescription(`You have thanked ${times || 0} user(s)`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor('#36393F')

        if(!user) return message.channel.send(nuser)

        db.add(`thanks_${user.id}`, 1)

        db.add(`thanked_${message.author.id}`, 1)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} thanks for voting ${user.username}`)
        .setDescription(`You thanked ${user.username}`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor('#36393F')

        message.channel.send(embed)
        
    }

}
    