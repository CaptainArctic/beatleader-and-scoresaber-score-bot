const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, BOT_TOKEN } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link a new player to scores tracking (BeatLeader or ScoreSaber)')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('The User ID of the player.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('platform')
                .setDescription('The platform of the player (BL for BeatLeader, SS for ScoreSaber).')
                .setRequired(true)
                .addChoices(
                    { name: 'BeatLeader', value: 'BL' },
                    { name: 'ScoreSaber', value: 'SS' }
                )),
    new SlashCommandBuilder()
        .setName('unlink')
        .setDescription('Unlink a player from tracking scores (BeatLeader or ScoreSaber)')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('The User ID of the player.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('The platform of the player (BL for BeatLeader, SS for ScoreSaber).')
                .setRequired(true)
                .addChoices(
                    { name: 'BeatLeader', value: 'BL' },
                    { name: 'ScoreSaber', value: 'SS' }
                )),
    new SlashCommandBuilder()
        .setName('bsr')
        .setDescription('Show details from a BeatSaber map')
        .addStringOption(option => 
            option.setName('mapid')
                .setDescription('The ID of the BeatSaber map.')
                .setRequired(true)),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
