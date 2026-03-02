import * as vscode from 'vscode';
import {exec} from 'child_process';
//import {platform} from 'os';
//import prof Hagrid black magic
import {join} from 'path';

//prof Hagrid(H.Bharadwaj)

export function activate(context:vscode.ExtensionContext){
	console.log("FaHh sound is active!");
	
	//testing testing mic testing
	context.subscriptions.push(
		vscode.commands.registerCommand('faaherror.playTest', ()=>{
			playSound(context);
			vscode.window.showInformationMessage("Test sound play hogya!");
			//prof Hagrid(H.Bharadwaj)
		})
	);

	//Error ko detect karna
	context.subscriptions.push(
		vscode.tasks.onDidEndTaskProcess((x)=>{
			if(!isEnabled()) return;

			if( x.exitCode !== 0){
				console.log('task failed with code ${x.exitCode} : playing FaHh');
				playSound(context);
			}
		})
	);

	context.subscriptions.push(
		vscode.window.onDidEndTerminalShellExecution((x)=>{
			if(!isEnabled()) return;

			if( x.exitCode !== 0){
				console.log("terminal command failed : ${x.exitCode} : FaHh!");
				playSound(context);
			}
		})
	);

  
}


function isEnabled(): boolean{
	return vscode.workspace.getConfiguration('faaherror').get<boolean>('enabled', true);
}

function playSound(context: vscode.ExtensionContext){
	const config = vscode.workspace.getConfiguration('faaherror');
	let relativePath = config.get<string>('soundFile', './media/fahhhhh.wav');

	//conver to full path
	const soundPath = join(context.extensionPath, relativePath.replace(/^\.\//, ''));

	console.log("Faaahhhhh!", soundPath);

	//media.soundplayer
	const psCommand = `(New-Object Media.SoundPlayer '${soundPath.replace(/'/g, "''")}').PlaySync();`;

	exec(`powershell -NoProfile -NonInteractive -Command "${psCommand}"`, (err)=>{
		if(err){//prof Hagrid(H.Bharadwaj)
			console.error('sound failed :(', err);
			vscode.window.showWarningMessage('Sound play failed. check if it exists');
		}
	});
}

export function deactivate(){}//prof Hagrid
