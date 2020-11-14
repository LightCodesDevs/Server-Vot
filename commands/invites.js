const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "invites",
    description: "check how much invites someone has",
    example: "!invites @Seeked and !invites",
    

    async run (client, message, args){

        const user = message.mentions.users.first() || message.author



        message.guild.fetchInvites().then(invites => { 
            const userInvites = invites.array().filter(o => o.inviter.id === user.id); 
            var userInviteCount = 0; 
            for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }

                db.set(`invites_${user.id}_${message.guild.id}`, userInviteCount)

                const embed = new Discord.MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL())
                .setDescription(`${user.username} has **${userInviteCount}** invites`)
                .setFooter(client.user.username, client.user.displayAvatarURL())

            })




    }

}
    

