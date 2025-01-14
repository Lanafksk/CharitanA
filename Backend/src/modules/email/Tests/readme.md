1/ Open Postman or another API testing tool.
2/ Enter the endpoint URL like:

http://localhost:4000/api/emails/send-donation-confirmation
http://localhost:4000/api/emails/send-project-creation-confirmation
http://localhost:4000/api/emails/send-welcome-email-donor
http://localhost:4000/api/emails/send-welcome-email-charity

3/ Select the POST method.
4/ Add the required headers:
5/ Content-Type: application/json
6/ Paste the relevant JSON request payload in the body.
7 Click Send and verify the response.

Note:
1/ Must Include .env in Team A pin
2/ Change to specific to Email in json file to test
