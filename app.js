/*
Pre-Requisites :
Install NODE and NPM latest versions.
Copy the source code from the GIT
Go to the project folder in command line with admin rights
Edit the .env file to update the correct DOWNLOADS folder path of your system

Run the below command to install the application
	NPM Install
Run the below command to execute the application
	NODE app.js DownloadPayload1.bat
	or
	NODE app.js DownloadPayload2.bat

First command will copy TestPayload1.zip as payload.zip and will create a resulting jason output at the DOWNLOADS path. This zip has the valid manifest and files. So the result will be success.
First command will copy TestPayload1.zip as payload.zip and will create a resulting jason output at the DOWNLOADS path. This zip has invalid size of the file. So the result will be failure.
*/

require('dotenv').config();

const { exec } = require("child_process");
const fs = require("fs");
const { exit } = require("process");
const unzipper = require("unzipper");

const downloadpath = process.env.DOWNLOADPATH;

const Args = process.argv.slice(2);


if (Args.length<=0)
{
	console.log("Please pass the command name. Syntax - node PassLinkFileProcess.js cmd1");
	process.exit();
}
exec(Args[0], (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
}
)

fs.createReadStream('payload.zip')
  .pipe(unzipper.Extract({ path: downloadpath }));


FilesInManifest = JSON.parse(fs.readFileSync(downloadpath + "manifest.json", "utf8"));
var interval = 2 * 1000; // 10 seconds;

for (item in FilesInManifest) {

	for (var i = 0; i <=FilesInManifest["Files"].length-1; i++) {
    setTimeout( function (i) {
			filename = FilesInManifest[item][i].name;
			filesize = FilesInManifest[item][i].size;

			fs.stat(downloadpath + filename, (err, stats) => {
				if (err) {
					fs.writeFileSync(downloadpath + 'VerificationResults.json', JSON.stringify("{   'Result': 'Failed',   'Details': 'One or more files listed in the manifest not found. Verification Failed.' }"));
					return;
				}
		
				else{
			
		
					if(stats.isFile())
					{
						
						if(stats.size==filesize)
						{
							fs.writeFileSync(downloadpath + 'VerificationResults.json', JSON.stringify("{   'Result': 'Success',   'Details': 'File  Found and passed manifest verification.' }"));
						}
						else
						{
							fs.writeFileSync(downloadpath + 'VerificationResults.json', JSON.stringify("{   'Result': 'Failed',   'Details': 'File Found. But size is not matching the manifest. Verification Failed.' }"));
						}
						
					}
					else
					{
						fs.writeFileSync(downloadpath + 'VerificationResults.json', JSON.stringify("{   'Result': 'Failed',   'Details': 'One or more files listed in the manifest are corrupted or missing. Verification Failed.' }"));
					}
				}
		  })

		}, interval * i, i);


  }
};