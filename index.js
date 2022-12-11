const Telegraf = require("telegraf").Telegraf,
    os = require ('node:os'),
    BOT_TOKEN = "5788385404:AAF7cm9VFmkMo8cjKXuhIZpo4ZB_jrWoYyg";

const bot = new Telegraf(BOT_TOKEN);
const { markAsUntransferable } = require("node:worker_threads");
const { Markup } = require("telegraf");
const comm = require('./command.js')

// let data_from_server={};
// let data_of_data_from_server="";

// function getCurrentDate()
// {
//     var today=new Date();
//     var today_day = String(today.getDate()).padStart(2,'0');
//     var today_month = String(today.getMonth()+1).padStart(2,'0');
//     var today_year = today.getFullYear();
//     today = today_year + "-" + today_month + "-" + today_day;
//     console.log(today);
//     console.log(data_of_data_from_server);
//     return today;
// }

// function getDataFromServer() {
//     return fetch("http://127.0.0.1:3000/music",{
//         method: "GET",
//         headers: {"Content-Type":"appication/json"}
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             data_from_server=data;
//             data_of_data_from_server=data_from_server.data.date;
//         })
//         .catch((er) => {
//             console.log('Error: $er');
//         })
// }

// bot.hears(/[A-Z]+/i, async (ctx) => { 
//     let message = ctx.message.text;
//     console.log(message);
//     if(data_of_data_from_server!=getCurrentDate())
//     {
//         await getDataFromServer();
//         ctx.reply(message +": "+data_from_server.data.stats[message]);
//     }
//     else
//     {
//         ctx.reply(message +": "+data_from_server.data.stats[message]);
//         console.log("dont go to server");
//     }
// })

bot.start((ctx) => {
    ctx.reply(`Вітаю, ${ctx.message.from.first_name}! Готовий до роботи.`);
})

bot.help((ctx) => {
    ctx.reply(comm.commands)
})

bot.hears([/Привіт+/i, /Hi+/i,/Hello+/i], ctx=> {
    ctx.reply("Й тобі привіт.")
})

bot.command('music', async (ctx) => { 
    try {
        await ctx.replyWithHTML('<b>Виберіть команду для запуску</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Показати лист всіх пісень','btn_getMusic'), Markup.button.callback('Додати пісню до бази','btn_postMusic')],
                [Markup.button.callback('Знайти по айді','btn_getMusicId'), Markup.button.callback('Оновити по айді','btn_putMusicId'), 
                Markup.button.callback('Видалити по айді','btn_delMusicId')],
                [Markup.button.callback('Відсортувати за алфавітом','btn_getMusicAZ'), 
                Markup.button.callback('Відсортувати в зворотньому напрямку','btn_getMusicZA')]
            ]
        )) 
    } catch(e) {
        console.error(e)
    }
})

bot.command('search_music', async (ctx) => { 
    try {
        await ctx.replyWithHTML('<b>Виберіть команду для запуску</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Порахувати всі пісні','btn_coutMusic'), Markup.button.callback('Порахувати пісні автора','btn_coutMusicA')],
                [Markup.button.callback('Випадкова пісню','btn_getMusicRand')],
                [Markup.button.callback('Пісні за частковим автором','btn_getMusicPartAuthor'), 
                Markup.button.callback('Пісні за частковую назвою','btn_getMusicPartSong')],
                [Markup.button.callback('Знайти пісню за автором','btn_getMusicAuthor'), 
                Markup.button.callback('Знайти пісню за назвою','btn_getMusicSong')]
            ]
        )) 
    } catch(e) {
        console.error(e)
    }
})

// function getMusic() {
//     return fetch("http://127.0.0.1:3000/music",{
//         method: "GET",
//         headers: {"Content-Type":"appication/json"}
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             data_from_server=data;
//             data_of_data_from_server=data_from_server.data.date;
//         })
//         .catch((er) => {
//             console.log('Error: $er');
//         })
// }

bot.action('btn_getMusic', async (ctx) => { 
    try {
        // fetch("http://127.0.0.1:3000/music",{
        // method: "GET",
        // headers: {"Content-Type":"appication/json"}
        // })
        // .then((res) => res.json())
        

        // .catch((er) => {
        //     console.log('Error: $er');
        // })
        
    } catch(e) {
        console.error(e)
    }
})


bot.on('message', (ctx) => { 
    ctx.reply("Схоже ви не вибрали корректну команду. Спробуйте будь-ласка ще раз!")       
})

console.log('all alright')
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))