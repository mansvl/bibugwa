const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const { exec, spawn, execSync } = require("child_process")
prefix = "¥"
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}J ${pad(minutes)}M ${pad(seconds)}D`
}

async function starts() {
	const nstr = new WAConnection()
	nstr.logger.level = 'warn'
	console.log(banner.string)
	nstr.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./nstrbug.json') && nstr.loadAuthInfo('./nstrbug.json')
	nstr.on('connecting', () => {
		start('2', 'Connecting...')
	})
	nstr.on('open', () => {
		success('2', 'Connected')
	})
		console.log('[ CARA PAKAI : ]')
        console.log('[ Ketik ¥biji untuk menggunakan bug grup whatsapp ]')
		console.log('')
        console.log('[ \x1B[37m\JANGAN LUPA\x1B[37m SUBCRIBE YT Biji OFC ]');
		console.log('[ \x1B[37m\IG : \x1B[37m @its.bijii ]');
	await nstr.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./nstrbug.json', JSON.stringify(nstr.base64EncodedAuthInfo(), null, '\t'))
	
	nstr.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	nstr.on('chat-update', async (nass) => {
		try {
            if (!nass.hasNewMessage) return
            nass = nass.messages.all()[0]
			if (!nass.message) return
			if (nass.key && nass.key.remoteJid == 'status@broadcast') return
			if (!nass.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(nass.message)
			const from = nass.key.remoteJid
			const type = Object.keys(nass.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			body = (type === 'conversation' && nass.message.conversation.startsWith(prefix)) ? nass.message.conversation : (type == 'imageMessage') && nass.message.imageMessage.caption.startsWith(prefix) ? nass.message.imageMessage.caption : (type == 'videoMessage') && nass.message.videoMessage.caption.startsWith(prefix) ? nass.message.videoMessage.caption : (type == 'extendedTextMessage') && nass.message.extendedTextMessage.text.startsWith(prefix) ? nass.message.extendedTextMessage.text : ''
                        var pes = (type === 'conversation' && nass.message.conversation) ? nass.message.conversation : (type == 'imageMessage') && nass.message.imageMessage.caption ? nass.message.imageMessage.caption : (type == 'videoMessage') && nass.message.videoMessage.caption ? nass.message.videoMessage.caption : (type == 'extendedTextMessage') && nass.message.extendedTextMessage.text ? nass.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			budy = (type === 'conversation') ? nass.message.conversation : (type === 'extendedTextMessage') ? nass.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			const botNumber = nstr.user.jid
			const ownerNumber = [`6281212594112@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const totalchat = await nstr.chats.all()
			const sender = isGroup ? nass.participant : nass.key.remoteJid
			const groupMetadata = isGroup ? await nstr.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				nstr.sendMessage(from, teks, text, {quoted:nass})
			}
			const sendMess = (hehe, teks) => {
				nstr.sendMessage(hehe, teks, text)
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
                            
             	case 'test':
			    nstr.sendMessage(from, 'Active\n\nJangan Lupa Subscribe Ya\nhttps://youtube.com/channel/UCwmUl9yi9qQmFg3C-HUS5ag',MessageType.text, { quoted: nass} )
				break    
				
	            case 'biji':
                await nstr.toggleDisappearingMessages(from)
                nstr.sendMessage(from, `Done`, text)
                break

                case 'bug':
                await nstr.toggleDisappearingMessages(from)
			    nstr.toggleDisappearingMessages(from)
			    nstr.sendMessage(from, `Done`, text)
			    break

                case 'bug2':
			    await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                await nstr.toggleDisappearingMessages(from)
                nstr.sendMessage(from, `Done`, text)
                break			                           
          }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()