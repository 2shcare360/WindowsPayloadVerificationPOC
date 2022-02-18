WindowsPayloadVerificationPOC
This POC demonstrates the ability to call a windows cmd/exe expecting to receive a zip file with payload and manifest. Then it unzips the zip file received from the cmd/exe and verifies the payload with he manifest. Post verification it generates a JSON file with verification resuts.

Pre-Requisites : Install NODE and NPM latest versions. Copy the source code from the GIT Go to the project folder in command line with admin rights Manually create the ".env" file with the correct environment variable called DOWNLOADPATH pointing to the "DOWNLOADS\PayLoad" folder path of your system. Please refer to the sample file "example_dotenv".

Run the below command to install the application

NPM Install
Run the below command to execute the application

NODE app.js DownloadPayload1.bat

or

NODE app.js DownloadPayload2.bat
First command will copy TestPayload1.zip as payload.zip and will create a resulting jason output at the DOWNLOADS path. This zip has the valid manifest and files. So the result will be success.

First command will copy TestPayload1.zip as payload.zip and will create a resulting jason output at the DOWNLOADS path. This zip has invalid size of the file. So the result will be failure.
