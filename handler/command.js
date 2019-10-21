const { readdirSync } = require("fs"); //
const ascii = require("ascii-table");

const table = new ascii().setHeading("Command", "Status"); // create a table and its headings

module.exports = (bot) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));

        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if(pull.name) {
                bot.commands.set(pull.name, pull);
                table.addRow(file, 'Loaded'); // create a row with loaded command
            }else {
                table.addRow(files, 'Error!'); // create a row with error to load command
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) // check for aliases and enamble them
                pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString()); //log the table of the commands
}