const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('quick.db');
const ms = require('ms');
const fs = require('fs')
const chalk = require('chalk')
const prefix = require('./config.json')
const { readdirSync } = require('fs');
const { join } = require('path');

client.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on('ready', () => {

    console.log(chalk.green(`${client.user.tag} is alive`))
    
})

client.on('error', error => {
    console.log(chalk.red(error))
})


client.on("message", async message => {

    const prefix = config.prefix

    if(!message.content.startsWith(prefix)) return


    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;


    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.log(chalk.red(error))
        }
    }
})

client.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

client.on('message', message => {
    if(message.content === '-snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)

        let embed = new Discord.MessageEmbed()
        .setTitle(client.users.cache.get(senderid).username, client.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(msg || 'there is nothing to snipe')
        .setTimestamp()
        .setColor('#36393F')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)
    }
})



client.login(config.token)
