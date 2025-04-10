const util = require('util'); const fs = require('fs-extra'); const { zokou } = require(__dirname + "/../framework/zokou"); const { format } = require(__dirname + "/../framework/mesfonctions"); const os = require("os"); const moment = require("moment-timezone"); const s = require(__dirname + "/../set");

zokou({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => { let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions; let { cm } = require(__dirname + "/../framework//zokou"); var coms = {}; var mode = "public";

if ((s.MODE).toLocaleLowerCase() != "yes") {
    mode = "private";
}

cm.map(async (com, index) => {
    if (!coms[com.categorie])
        coms[com.categorie] = [];
    coms[com.categorie].push(com.nomCom);
});

moment.tz.setDefault('Etc/GMT');

const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `

╭────《🇹🇿《𝐓𝐄𝐂𝐇-𝐗𝐏𝐄𝐑𝐓-𝐗𝐌𝐃》🇹🇿》──── ┴  ╭───────────── │❒⁠⁠⁠⁠│ ADMIN : ${s.OWNER_NAME} │❒│⁠⁠⁠⁠ CALENDER : ${date} │❒│⁠⁠⁠⁠ PREFIX : ${s.PREFIXE} │❒⁠⁠⁠⁠│⁠⁠⁠ BOT IS IN : ${mode} mode │❒│⁠⁠⁠⁠ ORDERS : ${cm.length} │❒│⁠⁠⁠⁠ SPACE : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())} │❒│⁠⁠⁠⁠ CHROME : ${os.platform()} │❒│⁠⁠⁠⁠ THEME : TECHXPERTTHEME ┬  ╰────────────── ╰─── ··《🇹🇿《𝐓𝐄𝐂𝐇-𝐗𝐏𝐄𝐑𝐓-𝐗𝐌𝐃》🇹🇿》··──\n`;

let menuMsg = `

───────── ☠️𝚻𝚵𝚫𝚳 𝐓𝐄𝐂𝐇-𝐗𝐏𝐄𝐑𝐓 𝐁𝐎𝐓☠️ ─────────

ℂ𝕆𝕄𝕄𝔸ℕ𝔻𝕊 `;

for (const cat in coms) {
    menuMsg += ` ╭─⬡ *${cat}* ⬡─`;
    for (const cmd of coms[cat]) {
        menuMsg += `\n⬡│▸ *${cmd}*`;
    }
    menuMsg += `\n  ╰────────────·· \n`
}

menuMsg += `

|⏣𝐌𝐀𝐃𝐄 𝐄𝐀𝐒𝐘 𝐛𝐲 𝐌𝐑 𝐓𝐄𝐂𝐇 𝐗𝐏𝐄𝐑𝐓🥷 ❒⁠⁠⁠⁠—————————— ❒⁠⁠⁠⁠——————————❒⁠⁠⁠⁠ `;

var lien = mybotpic();

if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *techxpertmd*, developer TechXpert Inc." , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *techxpertmd*, developer TechXpert Inc." }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
}
else {
    try {
        zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                externalAdReply: {
                    sourceUrl: sourceUrl,
                    title: "View Channel",
                    body: "Click to view the channel"
                }
            }
        }, { quoted: ms });
    } catch (e) {
        console.error("Error sending menu message:", e);
        repondre("🥵🥵 Menu erreur " + e.message);
    }
}

});

