const Telegraf = require("telegraf").Telegraf,
    os = require ('node:os'),
    BOT_TOKEN = "5788385404:AAF7cm9VFmkMo8cjKXuhIZpo4ZB_jrWoYyg";

const bot = new Telegraf(BOT_TOKEN);

let data_from_server={};
let data_of_data_from_server="";

function getCurrentDate()
{
    var today=new Date();
    var today_day = String(today.getDate()).padStart(2,'0');
    var today_month = String(today.getMonth()+1).padStart(2,'0');
    var today_year = today.getFullYear();
    today = today_year + "-" + today_month + "-" + today_day;
    console.log(today);
    console.log(data_of_data_from_server);
    return today;
}

function getDataFromServer() {
    return fetch("https://russianwarship.rip/api/v1/statistics/latest",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((res) => res.json())
        .then((data) => {
            data_from_server=data;
            data_of_data_from_server=data_from_server.data.date;
        })
        .catch((er) => {
            console.log('Error: $er');
        })
}

bot.start(ctx=> (
    ctx.reply("Вітаю!")
));

bot.hears(/[A-Z]+/i, async (ctx) => {
    let message = ctx.message.text;
    console.log(message);
    if(data_of_data_from_server!=getCurrentDate())
    {
        await getDataFromServer();
        ctx.reply(message +": "+data_from_server.data.stats[message]);
    }
    else
    {
        ctx.reply(message +": "+data_from_server.data.stats[message]);
        console.log("dont go to server");
    }
})

bot.hears(/Привіт+/i, ctx=> {
    ctx.reply("Й тобі привіт")
})

bot.hears(["Hi","Hello"], ctx=> (
    ctx.reply("\u{1F600}")
));

bot.launch();