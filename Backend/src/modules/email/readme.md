/api/emails/send-donation-confirmation
/api/emails/send-project-creation-confirmation
/api/emails/send-welcome-email-donor
/api/emails/send-welcome-email-charity

1/ Select the POST method.
2/ Content-Type: application/json
3/ Paste the relevant JSON request payload in the body.

Note:
1/ Must Include .env in Team A pin
2/ Change to specific to Email in json file to test

---

## Must inlcude field for sending mail

---

/api/emails/send-welcome-email-charity

{
"to": {
"email": "Customer Email Here",
"name": "Customer Name"
},
"charityData": {
"welcomeMessage": "Welcome to Charitan! We are excited to help you make an impact in the world."
}
}

---

/api/emails/send-donation-confirmation

{
"to": {
"email": "Customer Email",
"name": "Customer Name"
},
"donationData": {
"donationAmount": 100,
"projectTitle": "Clean Water Initiative",
"donationDate": "2024-12-19",
"region": "Sub-Saharan Africa",
"country": "Kenya"
}
}

---

/api/emails/send-welcome-email-donor

{
"to": {
"email": "Customer Email",
"name": "Customer Name"
},
"donorData": {
"welcomeMessage": "Thank you for joining Charitan! Together, we can make a difference."
}
}

---

/api/emails/send-project-creation-confirmation

{
"to": {
"email": "Customer Email",
"name": "Customer Name"
},
"projectData": {
"title": "Clean Water Initiative",
"targetAmount": 10000,
"currentAmount": 0,
"description": "Providing access to clean and safe drinking water to rural communities.",
"status": "active",
"startDate": "2024-01-01",
"endDate": "2024-06-01",
"region": "Sub-Saharan Africa",
"country": "Kenya",
"category": "Health & Sanitation"
}
}
