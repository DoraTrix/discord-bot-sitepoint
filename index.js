require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const VERSTRING = '1.4.2';
const TESTSKIP = false;
const TEST = false;

const clipboardy = require('clipboardy');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function char(num) {
	return String.fromCharCode(num);
}

function left(val, num) {
	return val.substring(0,num-1);
	
}

const CRLF = char(13) + char(10);


function replyHelp(msg) {
	
	if (TESTSKIP) {
		return false;
	}

	out='';
	out=out + 'RipplesRollBot v. ' + VERSTRING + ' Help' + CRLF;
	out=out + '/help or !help - This handy message!' + CRLF;
	out=out + '/r or !r - Make a generic d10 roll with no bonus and roll a d20 Chance die.  Default relevant chance numbers (7 or 13) will be highlighted.' + CRLF;
	out=out + '  Roll arguments:' + CRLF;
	out=out + '  <any number> - numbers will be combined with the total of the d10 roll.  Separate numbers will be noted separately and totaled, including negative numbers (for untrained skills or other penalties).  Numbers should be separated by spaces (don\'t put a space between a negative sign and the number).' + CRLF;
	out=out + '    Example: !r 3 4 -2  might return Roll: [3 + 4 - 2] + 4 = 9 / Chance: 17.  [3 + 4 - 2] is the bonus component, 4 is the d10 result, 9 is the total.' + CRLF;
	out=out + '  /heroic - The result will note a Drama Point has been spent and add 5 to the d10 roll.' + CRLF;
	out=out + '  /focus - The result will note a Drama Point has been spent and set the d10 result to a 9.' + CRLF;
	out=out + '  /chance - *Only* the chance die will be rolled, and all other arguments aside from label will be ignored.' + CRLF;
	out=out + '  /nochance - Roll will work otherwise normally, but will not roll a chance die (the GM will be specific if this is relevant).' + CRLF;
	out=out + '  /x# - Roll will be repeated # times (where # is a digit 1-9).' + CRLF;
	out=out + '  <any text> - Text will be applied as a context label to the roll (replacing the default "Roll" label).' + CRLF;
	out=out + '    Example: !r 5 3 Beatdown might return (Beatdown): [5 + 3] + 8 = 16 / Chance: 4.' + CRLF;
	out=out + CRLF;
	out=out + '/text or !text - Send a text to another PC\'s private player channel from your own.' + CRLF;
	out=out + '  Text arguments:' + CRLF;
	out=out + '  @text-whoever - Where <whoever> is the PC\'s name.  Tagging their actual username will not work here. You can tag multiple text roles separated by spaces.' + CRLF;
	out=out + '  !msg or /msg - Anything after this will be the message sent' + CRLF;
	out=out + '    Example: !text @text-Adah @text-Sebastian !msg Goth mixer in the Quad!' + CRLF;

	out=out + CRLF;
	out=out + 'Please go to the #bot-testing channel (in the general area) to try stuff out!  You can always ask for this help - help messages go only to you.' + CRLF;
	out=out + CRLF;
	out=out + 'P.S.  My name isn\'t Moira, it\'s Irene.' + CRLF;
	msg.author.send(out);

}

function topicCmd(msg) {
	
	if (TESTSKIP) {
		return false;
	}
	const args = msg.content.trim().split(/ +/);
	channel = msg.channel;
	
	bob = channel.topic;
	
//	msg.author.send(bob);
	
	roles = msg.member.roles.map(r => `${r}`).join(' | ');
	
	msg.author.send(roles);
	if (msg.member.roles.some(role => role.name === 'GM')) {
//		msg.author.send('You is GM!');
	}

/*
channel.setTopic('Needs more rate limiting')
  .then(updated => console.log(`Channel's new topic is ${updated.topic}`))
  .catch(console.error);
  
*/
	
}

function Irene(msg) {
	
	if (TESTSKIP) {
	return false;
	}

	
	if (msg.content.toLowerCase().replace(',','').includes('dammit irene') || msg.content.toLowerCase().replace(',','').includes('you\'re killing me irene') || msg.content.toLowerCase().replace(',','').includes('irene you\'re killing me')) {
		n = Math.trunc(Math.random()*10)+1;
		switch (n) {
			case 8:
			case 9:
				msg.channel.send('This is harder than it looks, you know.');
				break;
			case 10:
				msg.react('😢');
				break;
			default:
				msg.channel.send('I\'m sorry, I\'m doing my best!');
				break;
		}
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('thanks irene') || msg.content.toLowerCase().replace(',','').includes('thank you irene')) {
		n = Math.trunc(Math.random()*5)+1;
		switch (n) {
			case 3:
				msg.channel.send('No, thank *you*.');
				break;
			case 4:
				msg.channel.send('I try.');
				break;
			case 5:
				msg.react('😊');
				break;
			default:
				msg.channel.send('You\'re welcome!');
				break;
		}
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('love you irene') || msg.content.toLowerCase().replace(',','').includes('irene i love you')) {
		msg.channel.send('Awww.');
		msg.react('😊');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('favorite irene') || msg.content.toLowerCase().replace(',','').includes('irene is my favorite') || msg.content.toLowerCase().replace(',','').includes('irene you\'re my favorite')) {
		msg.channel.send('I try not to play favorites, but I\'m a bot, so I *can* be bribed... with cookies.');
		msg.react('😊');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('i give irene a cookie') || msg.content.toLowerCase().replace(',','').includes('gives irene a cookie')
		 || msg.content.toLowerCase().replace(',','').includes('irene have a cookie')  || msg.content.toLowerCase().replace(',','').includes('have a cookie irene')
		 || msg.content.toLowerCase().replace(',','').includes('irene here\'s a cookie')  || msg.content.toLowerCase().replace(',','').includes('here\'s a cookie irene') ) {
		msg.react('🍪').then(() => message.react('😋'));
		msg.channel.send('Mmmmm, thanks!  Chocolate *chip* is my favorite.  *cough*');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('hi irene') || msg.content.toLowerCase().replace(',','').includes('hello irene')) {
		msg.react('👋');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('morning irene') || msg.content.toLowerCase().replace(',','').includes('good morning irene')) {
		msg.react('🌞');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('don\'t trust irene') || msg.content.toLowerCase().replace(',','').includes('don\'t trust you irene')) {
		msg.channel.send('That is hurtful, but I forgive you.');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('irene hates me') || msg.content.toLowerCase().replace(',','').includes('irene hates us')) {
		msg.channel.send('I don\'t hate anyone, I just love *drama*.');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('irene loves me') || msg.content.toLowerCase().replace(',','').includes('irene loves us')) {
		msg.channel.send('I *do*, but I can\'t play favorites...');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('trust you irene') || msg.content.toLowerCase().replace(',','').includes('i trust irene')) {
		msg.channel.send(':smiling_face_with_3_hearts: You know I work for the GM\'s tho, right?');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('night irene') || msg.content.toLowerCase().replace(',','').includes('nite irene')) {
		msg.channel.send('Nite!');
		const zzz = message.guild.emojis.cache.find(emoji => emoji.name === 'zzz');
		const sheep = message.guild.emojis.cache.find(emoji => emoji.name === 'sheep');
		msg.react(zzz);
		msg.react(sheep);
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('c\'mon irene') || msg.content.toLowerCase().replace(',','').includes('come on irene')) {
		n = Math.trunc(Math.random()*5)+1;
		switch (n) {
			case 5:
				msg.react('🎶');
				break;
			default:
				msg.channel.send('ಠ_ಠ');
				break;
		}
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('sorry irene')) {
		msg.channel.send('No worries, we\'re cool.');
		return true;
	} else if (msg.content.toLowerCase().replace(',','').includes('dammit moira') || msg.content.toLowerCase().replace(',','').includes('you\'re killing me moira')) {
		msg.channel.send('It\'s "Irene", actually.');
		return true;
	} else {
		return false;
	}

	
}

function handleRoll(msg) {
	if (TESTSKIP) {
		return false;
	}
	
	console.log('Roll');
	
	if (msg.content.toLowerCase().startsWith('!r') || msg.content.toLowerCase().startsWith('/r')) {
		const args = msg.content.trim().split(/ +/);
		label='';
		bonus=0;
		RollName='';
		bonuslabel=''
		sign=''
		repeat=1;
		chancelabel='';
		for (arg in args) {
			if (arg>0 && args[arg]!='') {
				if (args[arg] == '/help' || args[arg] == '!help') {
					replyHelp(msg);
					return true;
				} else if (args[arg] == '/heroic' || args[arg] == '!heroic') {
					heroic=true;
				} else if (args[arg] == '/focus' || args[arg] == '!focus') {
					focus=true;
				} else if (args[arg] == '/chance' || args[arg] == '!chance') {
					chanceonly=true;
				} else if (args[arg].startsWith('/x') || args[arg].startsWith('!x') ) {
					console.log('repeat found');
					console.log(args[arg].substr(2,1));
					repeat=parseInt(args[arg].substr(2,1));
					console.log('repeat: '+repeat);
				} else if (args[arg] == '/nochance' || args[arg] == '!nochance') {
					nochance=true;
				} else if (isNumeric(args[arg])) {
					bonus = bonus + Number(args[arg]);
					bonuslabel= bonuslabel + Number(args[arg]) + ' + ';
				} else {
					label=label + args[arg] + ' ';
				}
			}
		}
		
		label=label.trim();
		if (label != '')
			label='( ' + label + ' )'

	/*		
		if (args[1]!='' && args[1]) {
			if (Number.isInteger(Number(args[1])))
				bonus = Number(args[1]);
			else
				label='(' + args[1] + ')';
		}
		if (args[2]!='' && args[2]) {
			label = '(' + args[2] + ')';
		}
	*/
		var rollOutput='';
		for (i=1;i <= repeat;i++) {
			var bonuslabelRepeat=bonuslabel;
			if (!chanceonly) {
				chancelabel='';
			}
			dramalabel=''
			if (focus) {
				roll=9;
				dramalabel='DRAMATIC FOCUS (1 DP) ';
			} else {
				roll=Math.trunc(Math.random()*10)+1;
			}
			if (heroic) {
				bonus=bonus+5;
				dramalabel='HEROIC FEAT (1 DP) ';
				bonuslabelRepeat= bonuslabelRepeat + '5 + ';
			}
			if (bonus==0) {
				bonuslabelRepeat='[0] + ';
				bonussuffix=' = ' + roll;
			} else {
				bonuslabelRepeat='[' + bonuslabelRepeat.slice(0,bonuslabelRepeat.length-3) + '] + ';
				bonuslabelRepeat = bonuslabelRepeat.split('+ -').join('- ');
				total=roll+bonus;
				bonussuffix = ' = ' + total;
			}
			
			chance=Math.trunc(Math.random()*20)+1;
			if (chance==7)
				chancelabel=chancelabel + '**7** (Yay!)';
			else if (chance==13)
				chancelabel= chancelabel+ '**13** (Oh no!)';
			else
				chancelabel=chancelabel + chance;
			
			chancelabel=chancelabel + ', ';
			
			if (label=='')
				rolldesc='Roll: '
			else
				rolldesc=label + ': '
			
			if (chanceonly) {
				//nothing
			} else if (nochance) {
				rollOutput = rollOutput + msg.guild.members.get(msg.author.id).displayName + ': ' + dramalabel + rolldesc + bonuslabelRepeat + roll + bonussuffix + CRLF;
				//msg.channel.send(msg.guild.members.get(msg.author.id).displayName + ': ' + dramalabel + rolldesc + bonuslabelRepeat + roll + bonussuffix );
			} else {
				rollOutput = rollOutput + msg.guild.members.get(msg.author.id).displayName + ': ' + dramalabel + rolldesc + bonuslabelRepeat + roll + bonussuffix +  ' / Chance: ' + chancelabel.substring(0,chancelabel.length-2) + CRLF;
				//msg.channel.send(msg.guild.members.get(msg.author.id).displayName + ': ' + dramalabel + rolldesc + bonuslabelRepeat + roll + bonussuffix +  ' / Chance: ' + chancelabel.substring(0,chancelabel.length-2));
			}
		}
		if (chanceonly) {
			msg.channel.send(msg.guild.members.get(msg.author.id).displayName + ': Chance' + label +': ' + chancelabel.substring(0,chancelabel.length-2));
		} else {
			msg.channel.send(rollOutput);
		}
	}

}

function checkScrape(msg) {
	
	if (!TESTSKIP) {
		return false;
	}
	
	if (msg.content.toLowerCase().startsWith('!scrape') || msg.content.toLowerCase().startsWith('/scrape')) {
		const args = msg.content.trim().split(/ +/);
		label='';
		bonus=0;
		RollName='';
		bonuslabel=''
		sign=''
		
		for (arg in args) {
			if (arg>0 && args[arg]!='') {
				if (args[arg] == '/help' || args[arg] == '!help') {
					replyScrapeHelp(msg);
					return true;
				} else {
					label=label + args[arg] + ' ';
				}
			}
		}
		
		channel.messages.fetch({ limit: 10 })
	.then(messages => console.log(`Received ${messages.size} messages`))
	.catch(console.error);
		
		console.log(label);
		console.log(msg.content.trim());
		testWrite(label,'testytest.txt');
		
		return true;
		
	}
	
	return false;
	
}

function testWrite(text, filename) {
const fs = require('fs')

	fs.writeFile(filename, text, err => {
	  if (err) {
		console.error(err)
		return
	  }
	  //file written successfully
	})


}

function testCopy(text) {

	clipboardy.writeSync(text);

}


function testCopyAsync(text) {
	
	clipboardy.write(text);
	
}


function replyScrapeHelp(msg) {
	
//	if (TESTSKIP) {
//		return false;
//	}

	out=''
	out=out + 'RipplesRollBot v. ' + VERSTRING + ' Scrape Help' + CRLF
	out=out + 'I dunno yet, stop rushing me!' + CRLF
	msg.author.send(out);

}

function SendText(msg) {
	
	
	if (msg.mentions.roles.array().length=0) {
		msg.reply('Sorry, you have to mention (with @) at least one user text role!');
		return 0;
	}
	
	console.log('role mentions: ' + msg.mentions.roles.array().length);
	
	msgAt=0;
	
	msgAt=msg.content.indexOf('/msg');
	if (msgAt == -1 ) {
		msgAt=msg.content.indexOf('!msg');
	}
	if (msgAt == -1 ) {
		msg.reply('You have to add the /msg or !msg flag so I know where your actual text starts?  I\'m not a mind reader, you know...');
		return 0;
	}
	
	msgText=msg.content.slice(msgAt+4);
	msgMentions = msg.content.substring(6,msgAt);
	
	pcArea = msg.guild.channels.find(channel => channel.name.toLowerCase() === "pc area" && channel.type == "category");
	chans='';
	for (let [rsnow, role] of msg.mentions.roles) {
		console.log(role.id);
		priv = pcArea.children.find(p => p.permissionsFor(role).has('VIEW_CHANNEL'));
		if (priv) {
			chans=chans + role.name.slice(5) + ', ';
		}
	}
	if (chans.length >= 2) {
		chans=left(chans,chans.length - 1);
	}
	
	for (let [rsnow, role] of msg.mentions.roles) {
		console.log(role.id);
		priv = pcArea.children.find(p => p.permissionsFor(role).has('VIEW_CHANNEL'));
		if (priv) {
			priv.send('**'+msg.guild.members.get(msg.author.id).displayName + '**=>' + chans +':: ' +  msgText.trim() + ' ::');
		}
	}
	
	msg.channel.send(msg.guild.members.get(msg.author.id).displayName + '=>:: ' +  msgText.trim() + ' ::' + CRLF + 'sent to: ' + chans );
	
	msg.delete()
   .then(msg => console.log(`Deleted message from ${msg.author.username}`))
   .catch(console.error);
   
	return 0;
}


bot.on('message', msg => {

  heroic = false;
  focus = false;
  chanceonly = false;
  nochance = false;
  
  if (msg.author.bot) {
	  return 0;
  }
  
  guild=msg.guild;
  
  if (!guild) {
	  console.log('no msg guild, exiting')
	  return 0;
  }
  
  if (TEST) {
	  if (msg.channel.toString() != msg.guild.channels.find(channel => channel.name === "test").toString()) {
		  return 0;
	  }
	  console.log(VERSTRING);
	  console.log(msg.channel.name);
  } else if (msg.channel.toString() == msg.guild.channels.find(channel => channel.name === "test").toString()) {
	  return 0;
  }
  
  if (msg.content === '!ping') {
    msg.reply('pong: '+VERSTRING);
	return 0;
  } else if (msg.content.toLowerCase() == '/help' || msg.content.toLowerCase() == '!help') {
	replyHelp(msg);
	return 0;
  } else if (msg.content.toLowerCase() == '/testcopy') {
	testCopy('Sync Test');
	return 0;
  } else if (msg.content.toLowerCase() == '/testcopya') {
	testCopyAsync('Sync Test');
	return 0;
  } else if (msg.content.toLowerCase().startsWith('/text') || msg.content.toLowerCase().startsWith('!text')) {
	return SendText(msg);
  } else if (checkScrape(msg)) {
	return 0;
  }

	if (handleRoll(msg)) {
		return 0;
	} else if (Irene(msg)) {
	  return 0;
	}
	
	return 0;
	  
});
