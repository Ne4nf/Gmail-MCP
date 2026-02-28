#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');

// OAuth2 configuration
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify'
];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'client_secret_425114907013-2oen4a4prekk0rndu8r9e1901irc8rnj.apps.googleusercontent.com.json');

class GmailMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'gmail-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async loadCredentials() {
    const content = await fs.readFile(CREDENTIALS_PATH);
    return JSON.parse(content);
  }

  async authorize() {
    const credentials = await this.loadCredentials();
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
      const token = await fs.readFile(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token));
      return oAuth2Client;
    } catch (err) {
      return await this.getNewToken(oAuth2Client);
    }
  }

  async getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    
    console.error('\n==============================================');
    console.error('Gmail MCP Server - Authorization Required');
    console.error('==============================================');
    console.error('\nPlease authorize this app by visiting this URL:');
    console.error('\n' + authUrl + '\n');
    console.error('After authorization, you will be redirected to a URL.');
    console.error('Copy the "code" parameter from the URL and enter it below.\n');
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question('Enter the authorization code: ', async (code) => {
        rl.close();
        try {
          const { tokens } = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(tokens);
          await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
          console.error('Token stored to', TOKEN_PATH);
          resolve(oAuth2Client);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_emails',
          description: 'Search for emails in Gmail using a query string. You can search by sender, subject, content, date, etc.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (e.g., "from:someone@example.com subject:hiring")',
              },
              maxResults: {
                type: 'number',
                description: 'Maximum number of results to return (default: 10)',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_email',
          description: 'Get the full content of a specific email by its ID',
          inputSchema: {
            type: 'object',
            properties: {
              emailId: {
                type: 'string',
                description: 'The ID of the email to retrieve',
              },
            },
            required: ['emailId'],
          },
        },
        {
          name: 'send_email',
          description: 'Send a new email',
          inputSchema: {
            type: 'object',
            properties: {
              to: {
                type: 'string',
                description: 'Recipient email address',
              },
              subject: {
                type: 'string',
                description: 'Email subject',
              },
              body: {
                type: 'string',
                description: 'Email body content',
              },
            },
            required: ['to', 'subject', 'body'],
          },
        },
        {
          name: 'reply_email',
          description: 'Reply to an existing email',
          inputSchema: {
            type: 'object',
            properties: {
              emailId: {
                type: 'string',
                description: 'The ID of the email to reply to',
              },
              body: {
                type: 'string',
                description: 'Reply message body',
              },
            },
            required: ['emailId', 'body'],
          },
        },
        {
          name: 'reply_email_with_attachments',
          description: 'Reply to an existing email with file attachments (images, documents, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              emailId: {
                type: 'string',
                description: 'The ID of the email to reply to',
              },
              body: {
                type: 'string',
                description: 'Reply message body',
              },
              attachments: {
                type: 'array',
                description: 'Array of file paths to attach',
                items: {
                  type: 'string',
                  description: 'Absolute file path to attachment',
                },
              },
            },
            required: ['emailId', 'body', 'attachments'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const auth = await this.authorize();
        const gmail = google.gmail({ version: 'v1', auth });

        switch (name) {
          case 'search_emails':
            return await this.searchEmails(gmail, args.query, args.maxResults || 10);
          
          case 'get_email':
            return await this.getEmail(gmail, args.emailId);
          
          case 'send_email':
            return await this.sendEmail(gmail, args.to, args.subject, args.body);
          
          case 'reply_email':
            return await this.replyEmail(gmail, args.emailId, args.body);
          
          case 'reply_email_with_attachments':
            return await this.replyEmailWithAttachments(gmail, args.emailId, args.body, args.attachments);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async searchEmails(gmail, query, maxResults) {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: maxResults,
    });

    const messages = res.data.messages || [];
    
    if (messages.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No emails found matching the query.',
          },
        ],
      };
    }

    const emailDetails = await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'metadata',
          metadataHeaders: ['From', 'To', 'Subject', 'Date'],
        });

        const headers = email.data.payload.headers;
        const getHeader = (name) => headers.find(h => h.name === name)?.value || 'N/A';

        return {
          id: message.id,
          from: getHeader('From'),
          to: getHeader('To'),
          subject: getHeader('Subject'),
          date: getHeader('Date'),
          snippet: email.data.snippet,
        };
      })
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(emailDetails, null, 2),
        },
      ],
    };
  }

  async getEmail(gmail, emailId) {
    const email = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
      format: 'full',
    });

    const headers = email.data.payload.headers;
    const getHeader = (name) => headers.find(h => h.name === name)?.value || 'N/A';

    // Extract body
    let body = '';
    if (email.data.payload.parts) {
      const textPart = email.data.payload.parts.find(part => part.mimeType === 'text/plain');
      if (textPart && textPart.body.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    } else if (email.data.payload.body.data) {
      body = Buffer.from(email.data.payload.body.data, 'base64').toString('utf-8');
    }

    const emailData = {
      id: emailId,
      threadId: email.data.threadId,
      from: getHeader('From'),
      to: getHeader('To'),
      subject: getHeader('Subject'),
      date: getHeader('Date'),
      body: body,
      snippet: email.data.snippet,
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(emailData, null, 2),
        },
      ],
    };
  }

  async sendEmail(gmail, to, subject, body) {
    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return {
      content: [
        {
          type: 'text',
          text: `Email sent successfully! Message ID: ${res.data.id}`,
        },
      ],
    };
  }

  async replyEmail(gmail, emailId, body) {
    // Get the original email to extract thread ID and headers
    const originalEmail = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
      format: 'metadata',
      metadataHeaders: ['From', 'To', 'Subject', 'Message-ID', 'References'],
    });

    const headers = originalEmail.data.payload.headers;
    const getHeader = (name) => headers.find(h => h.name === name)?.value || '';
    
    const originalFrom = getHeader('From');
    const originalSubject = getHeader('Subject');
    const messageId = getHeader('Message-ID');
    const references = getHeader('References');
    
    // Extract email address from "Name <email@domain.com>" format
    const toEmail = originalFrom.match(/<(.+)>/) ? originalFrom.match(/<(.+)>/)[1] : originalFrom;
    
    // Build reply subject
    const replySubject = originalSubject.startsWith('Re:') ? originalSubject : `Re: ${originalSubject}`;
    
    // Build message with proper headers for threading
    const message = [
      `To: ${toEmail}`,
      `Subject: ${replySubject}`,
      `In-Reply-To: ${messageId}`,
      `References: ${references ? references + ' ' : ''}${messageId}`,
      '',
      body,
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: originalEmail.data.threadId,
      },
    });

    return {
      content: [
        {
          type: 'text',
          text: `Reply sent successfully! Message ID: ${res.data.id}\nReplied to: ${toEmail}\nSubject: ${replySubject}`,
        },
      ],
    };
  }

  async replyEmailWithAttachments(gmail, emailId, body, attachmentPaths) {
    // Get the original email to extract thread ID and headers
    const originalEmail = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
      format: 'metadata',
      metadataHeaders: ['From', 'To', 'Subject', 'Message-ID', 'References'],
    });

    const headers = originalEmail.data.payload.headers;
    const getHeader = (name) => headers.find(h => h.name === name)?.value || '';
    
    const originalFrom = getHeader('From');
    const originalSubject = getHeader('Subject');
    const messageId = getHeader('Message-ID');
    const references = getHeader('References');
    
    // Extract email address from "Name <email@domain.com>" format
    const toEmail = originalFrom.match(/<(.+)>/) ? originalFrom.match(/<(.+)>/)[1] : originalFrom;
    
    // Build reply subject
    const replySubject = originalSubject.startsWith('Re:') ? originalSubject : `Re: ${originalSubject}`;
    
    // Create multipart MIME message with attachments
    const boundary = `----=_Part_${Date.now()}`;
    
    const messageParts = [
      `To: ${toEmail}`,
      `Subject: ${replySubject}`,
      `In-Reply-To: ${messageId}`,
      `References: ${references ? references + ' ' : ''}${messageId}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      '',
      body,
      '',
    ];

    // Add attachments
    for (const filePath of attachmentPaths) {
      const fileContent = await fs.readFile(filePath);
      const fileName = path.basename(filePath);
      const mimeType = this.getMimeType(fileName);
      const base64Content = fileContent.toString('base64');

      messageParts.push(`--${boundary}`);
      messageParts.push(`Content-Type: ${mimeType}; name="${fileName}"`);
      messageParts.push(`Content-Disposition: attachment; filename="${fileName}"`);
      messageParts.push(`Content-Transfer-Encoding: base64`);
      messageParts.push('');
      messageParts.push(base64Content);
      messageParts.push('');
    }

    messageParts.push(`--${boundary}--`);

    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: originalEmail.data.threadId,
      },
    });

    return {
      content: [
        {
          type: 'text',
          text: `Reply sent with ${attachmentPaths.length} attachment(s)!\nMessage ID: ${res.data.id}\nReplied to: ${toEmail}\nSubject: ${replySubject}\nAttachments: ${attachmentPaths.map(p => path.basename(p)).join(', ')}`,
        },
      ],
    };
  }

  getMimeType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.txt': 'text/plain',
      '.zip': 'application/zip',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Gmail MCP server running on stdio');
  }
}

// Run the server
const server = new GmailMCPServer();
server.run().catch(console.error);
