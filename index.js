const Telegraf = require("telegraf").Telegraf,
    os = require ('node:os'),
    BOT_TOKEN = "5788385404:AAF7cm9VFmkMo8cjKXuhIZpo4ZB_jrWoYyg";

const bot = new Telegraf(BOT_TOKEN);
const { Markup } = require("telegraf");
const comm = require('./command.js')
let prapor = " ";

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}


bot.start((ctx) => {
    ctx.reply(`Вітаю, ${ctx.message.from.first_name}! Готовий до роботи.\nЦей бот був написаний для дипломної роботи з використанням API`)
})

bot.help((ctx) => {
    ctx.reply(comm.commands)
})

bot.hears([/Привіт+/i, /Hi+/i,/Hello+/i], ctx=> {
    ctx.reply("Й тобі привіт! Цей бот не створений для відповіді на повідомлення без команд.\nДля отримання списку команд зробіть запит /help")
})

bot.command('music', async (ctx) => { 
    try {
        await ctx.replyWithHTML('<b>Виберіть команду для запуску</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Показати лист всіх пісень','btn_getMusic'), 
                Markup.button.callback('Додати пісню до бази','btn_postMusic')],
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
                [Markup.button.callback('Порахувати всі пісні','btn_countMusic'), Markup.button.callback('Порахувати пісні автора','btn_countMusicA')],
                [Markup.button.callback('Отримати випадкову пісню','btn_getMusicRand')],
                [Markup.button.callback('Шукати пісні за частковим автором чи назвою','btn_getMusicPartText')],
                [Markup.button.callback('Знайти пісню за автором','btn_getMusicAuthor'), 
                Markup.button.callback('Знайти пісню за назвою','btn_getMusicSong')]
            ]
        )) 
    } catch(e) {
        console.error(e)
    }
})

bot.action('btn_getMusic', async (ctx) => { 
    try {
        await fetch("http://127.0.0.1:3000/music",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('res', res)
            let list = ""
            res.forEach(element => {
                list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
            });
            ctx.reply(list, {disable_web_page_preview: true})
        })       
    } catch(e) {
        console.error(e)
    }
    sleep(400);
        ctx.replyWithHTML('<b>Виберіть команду для запуску</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Відсортувати за алфавітом','btn_getMusicAZ'), 
                Markup.button.callback('Відсортувати в зворотньому напрямку','btn_getMusicZA')]
            ]
        ))
})

bot.action('btn_getMusicAZ', async (ctx) => { 
    try {
        ctx.reply("_____________________________________________")
        ctx.reply("\r\nОсь новий список.")
        await fetch("http://127.0.0.1:3000/music/sort-AtoZ",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('res', res)
            let list = ""
            res.forEach(element => {
                list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
            });
            ctx.reply(list, {disable_web_page_preview: true})
        })       

    } catch(e) {
        console.error(e)
    }
})

bot.action('btn_getMusicZA', async (ctx) => { 
    try {
        ctx.reply("_____________________________________________")
        ctx.reply("\r\nОсь новий список.")
        await fetch("http://127.0.0.1:3000/music/sort-ZtoA",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('res', res)
            let list = ""
            res.forEach(element => {
                list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
            });
            ctx.reply(list, {disable_web_page_preview: true})
        })       

    } catch(e) {
        console.error(e)
    }
})

bot.action('btn_getMusicRand', async (ctx) => { 
    try {
        await fetch("http://127.0.0.1:3000/music/music-by-random",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('res', res)
            let list = ""
            res.forEach(element => {
                list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
            });
            ctx.reply(list)
        })       
    } catch(e) {
        console.error(e)
    }
    sleep(400);
    ctx.replyWithHTML('<b>Виберіть команду для запуску</b>', Markup.inlineKeyboard(
        [Markup.button.callback('Отримати випадкову пісню','btn_getMusicRand')]
    ))
     
})

bot.action('btn_getMusicPartText', (ctx) => { 
    ctx.reply("Введіть автора чи назву пісні");
    prapor = "text";
})

bot.action('btn_countMusic', async (ctx) => { 
    try {
        await fetch("http://127.0.0.1:3000/music/count-music",{
        method: "GET",
        headers: {"Content-Type":"appication/json"}
        })
        .then((response) => response.json())
        .then((res) => {
            console.log('res', res)
            let list = ""
            list+=res.message
            ctx.reply(list)
        })       
    } catch(e) {
        console.error(e)
    }
})

bot.action('btn_countMusicA', (ctx) => { 
    ctx.reply("Введіть автора");
    prapor = "Avtor";
})

bot.action('btn_getMusicAuthor', (ctx) => { 
    ctx.reply("Введіть автора");
    prapor = "PowAvtr";
})

bot.action('btn_getMusicSong', (ctx) => { 
    ctx.reply("Введіть повну назву");
    prapor = "PowSong";
})


bot.hears(/[a-zA-Zа-яА-Я]+/, (ctx) => {
    let endpoint = "";
    if (prapor == "text") {
        endpoint = "http://127.0.0.1:3000/music/search-music/"+ctx.match
        try {
            fetch(endpoint,{
            method: "GET",
            headers: {"Content-Type":"appication/json"}
            })
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                let list = ""
                res.forEach(element => {
                    list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
                });
                if (list != "") {
                    ctx.reply(list)
                } else {
                    ctx.reply("Пісні з такою частковую назвою чи автором не має. Спробуйте ще раз, перевіривши запит.")
                }
                prapor = "";
            })       
        } catch(e) {
            console.error(e)
        }
    }
    else if (prapor == "Avtor") {
        endpoint = "http://127.0.0.1:3000/music/count-music/"+ctx.match
        try {
            fetch(endpoint,{
            method: "GET",
            headers: {"Content-Type":"appication/json"}
            })
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                let list = ""
                list+=res.message
                ctx.reply(list)
                prapor = "";
            })
        } catch(e) {
            console.error(e)
        }
    }
    else if (prapor == "PowAvtr") {
        endpoint = "http://127.0.0.1:3000/music/music-by-author/"+ctx.match
        try {
            fetch(endpoint,{
            method: "GET",
            headers: {"Content-Type":"appication/json"}
            })
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                let list = ""
                res.forEach(element => {
                    list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
                });
                if (list != "") {
                    ctx.reply(list)
                } else {
                    ctx.reply("Пісні з таким автором не має. Спробуйте ще раз, перевіривши запит.")
                }
                prapor = "";
            })       
        } catch(e) {
            console.error(e)
        }
    }
    else if (prapor == "PowSong") {
        endpoint = "http://127.0.0.1:3000/music/music-by-song/"+ctx.match
        try {
            fetch(endpoint,{
            method: "GET",
            headers: {"Content-Type":"appication/json"}
            })
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                let list = ""
                res.forEach(element => {
                    list+=element.author+" "+element.song+" "+element.url_youtube+'\n'
                });
                if (list != "") {
                    ctx.reply(list)
                } else {
                    ctx.reply("Пісні з такою назвою не має. Спробуйте ще раз, перевіривши запит.")
                }
                prapor = "";
            })       
        } catch(e) {
            console.error(e)
        }
    }
    else {
        ctx.reply("Схоже ви не вибрали корректну команду. Спробуйте будь-ласка ще раз!\nСписок доступних команд знаходиться в меню, або за запитом /help") 
    }
})



console.log('all alright')
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))