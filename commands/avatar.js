const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "avatar",
    description: "check how much invites someone has",
    example: "!invites @Seeked and !invites",
    

    async run (client, message, args){

        const user = message.mentions.users.first() || message.author



                const embed = new Discord.MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL())
                .setTitle(`${user.username}'s avatar`)
                .setImage(user.displayAvatarURL( { size: 512 } ))
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setColor('#36393F')

                message.channel.send(embed)






    }

}
    