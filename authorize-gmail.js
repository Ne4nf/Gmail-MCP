#!/usr/bin/env node

// Quick authorization helper for Gmail MCP
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify'
];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'client_secret_425114907013-2oen4a4prekk0rndu8r9e1901irc8rnj.apps.googleusercontent.com.json');

async function authorize() {
  console.log('\n==============================================');
  console.log('Gmail OAuth Authorization Helper');
  console.log('==============================================\n');

  // Load credentials
  const content = await fs.readFile(CREDENTIALS_PATH);
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Generate auth URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('STEP 1: Copy this URL and open in your browser:\n');
  console.log('\x1b[36m%s\x1b[0m', authUrl);
  console.log('\nSTEP 2: Login to your Gmail account');
  console.log('STEP 3: Accept permissions');
  console.log('STEP 4: You will be redirected to a URL like:');
  console.log('        http://localhost/?code=XXXXX&scope=...');
  console.log('\nSTEP 5: Copy the CODE from that URL\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Paste the authorization code here: ', async (code) => {
      rl.close();
      try {
        console.log('\nExchanging code for tokens...');
        const { tokens } = await oAuth2Client.getToken(code);
        
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        
        console.log('\n✓ SUCCESS! Token saved to:', TOKEN_PATH);
        console.log('\nYou can now use Gmail MCP in Claude Code!');
        console.log('Try: Use gmail MCP to search my recent emails\n');
        
        resolve();
      } catch (err) {
        console.error('\n✗ ERROR:', err.message);
        reject(err);
      }
    });
  });
}

authorize().catch(console.error);
