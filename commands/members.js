const Discord = require('discord.js');
const db = require('quick.db')
const config = require('../config.json')


module.exports = {
    name: "members",
    description: "members",
    example: "!members",
    

    async run (client, message, args, prefix){


        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`**${message.guild.name}** has **${message.guild.memberCount}** members`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor('#36393F')

        message.channel.send(embed)



    }

}
    
