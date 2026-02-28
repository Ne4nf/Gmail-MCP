#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const TODO_FILE = path.join(__dirname, 'todos.json');

class TodoMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'todo-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.todos = [];
    this.setupHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async loadTodos() {
    try {
      const data = await fs.readFile(TODO_FILE, 'utf-8');
      this.todos = JSON.parse(data);
    } catch (err) {
      // File doesn't exist, start with empty array
      this.todos = [];
    }
  }

  async saveTodos() {
    await fs.writeFile(TODO_FILE, JSON.stringify(this.todos, null, 2));
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'add_todo',
          description: 'Add a new todo item to the list',
          inputSchema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'The title of the todo item',
              },
              description: {
                type: 'string',
                description: 'Detailed description of the todo (optional)',
              },
              priority: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
                description: 'Priority level (default: medium)',
                default: 'medium',
              },
              dueDate: {
                type: 'string',
                description: 'Due date in YYYY-MM-DD format (optional)',
              },
            },
            required: ['title'],
          },
        },
        {
          name: 'list_todos',
          description: 'List all todo items, optionally filtered by status or priority',
          inputSchema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['pending', 'completed', 'all'],
                description: 'Filter by status (default: all)',
                default: 'all',
              },
              priority: {
                type: 'string',
                enum: ['low', 'medium', 'high', 'all'],
                description: 'Filter by priority (default: all)',
                default: 'all',
              },
            },
          },
        },
        {
          name: 'complete_todo',
          description: 'Mark a todo item as completed',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                description: 'The ID of the todo item to complete',
              },
            },
            required: ['id'],
          },
        },
        {
          name: 'delete_todo',
          description: 'Delete a todo item',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                description: 'The ID of the todo item to delete',
              },
            },
            required: ['id'],
          },
        },
        {
          name: 'update_todo',
          description: 'Update an existing todo item',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                description: 'The ID of the todo item to update',
              },
              title: {
                type: 'string',
                description: 'New title (optional)',
              },
              description: {
                type: 'string',
                description: 'New description (optional)',
              },
              priority: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
                description: 'New priority (optional)',
              },
              dueDate: {
                type: 'string',
                description: 'New due date in YYYY-MM-DD format (optional)',
              },
            },
            required: ['id'],
          },
        },
        {
          name: 'get_stats',
          description: 'Get statistics about todos (total, completed, pending, by priority)',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'todo://list',
          name: 'Todo List',
          description: 'Current todo list with all items',
          mimeType: 'application/json',
        },
      ],
    }));

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      if (uri === 'todo://list') {
        await this.loadTodos();
        return {
          contents: [
            {
              uri: uri,
              mimeType: 'application/json',
              text: JSON.stringify(this.todos, null, 2),
            },
          ],
        };
      }
      
      throw new Error(`Unknown resource: ${uri}`);
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        await this.loadTodos();

        switch (name) {
          case 'add_todo':
            return await this.addTodo(args);
          
          case 'list_todos':
            return await this.listTodos(args);
          
          case 'complete_todo':
            return await this.completeTodo(args.id);
          
          case 'delete_todo':
            return await this.deleteTodo(args.id);
          
          case 'update_todo':
            return await this.updateTodo(args);
          
          case 'get_stats':
            return await this.getStats();
          
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

  async addTodo(args) {
    const newTodo = {
      id: this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
      title: args.title,
      description: args.description || '',
      priority: args.priority || 'medium',
      dueDate: args.dueDate || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    this.todos.push(newTodo);
    await this.saveTodos();

    return {
      content: [
        {
          type: 'text',
          text: `✓ Todo added successfully!\n\n${JSON.stringify(newTodo, null, 2)}`,
        },
      ],
    };
  }

  async listTodos(args) {
    let filtered = this.todos;

    // Filter by status
    if (args.status && args.status !== 'all') {
      filtered = filtered.filter(t => t.status === args.status);
    }

    // Filter by priority
    if (args.priority && args.priority !== 'all') {
      filtered = filtered.filter(t => t.priority === args.priority);
    }

    if (filtered.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No todos found matching the criteria.',
          },
        ],
      };
    }

    // Format the list nicely
    let output = `Found ${filtered.length} todo(s):\n\n`;
    filtered.forEach(todo => {
      const status = todo.status === 'completed' ? '✓' : '○';
      const priority = todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢';
      output += `${status} [${todo.id}] ${priority} ${todo.title}\n`;
      if (todo.description) output += `   ${todo.description}\n`;
      if (todo.dueDate) output += `   Due: ${todo.dueDate}\n`;
      output += '\n';
    });

    return {
      content: [
        {
          type: 'text',
          text: output,
        },
      ],
    };
  }

  async completeTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }

    if (todo.status === 'completed') {
      return {
        content: [
          {
            type: 'text',
            text: `Todo #${id} is already completed.`,
          },
        ],
      };
    }

    todo.status = 'completed';
    todo.completedAt = new Date().toISOString();
    await this.saveTodos();

    return {
      content: [
        {
          type: 'text',
          text: `✓ Todo #${id} marked as completed!\n\n"${todo.title}"`,
        },
      ],
    };
  }

  async deleteTodo(id) {
    const index = this.todos.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error(`Todo with ID ${id} not found`);
    }

    const deleted = this.todos.splice(index, 1)[0];
    await this.saveTodos();

    return {
      content: [
        {
          type: 'text',
          text: `✓ Todo #${id} deleted!\n\n"${deleted.title}"`,
        },
      ],
    };
  }

  async updateTodo(args) {
    const todo = this.todos.find(t => t.id === args.id);
    
    if (!todo) {
      throw new Error(`Todo with ID ${args.id} not found`);
    }

    if (args.title) todo.title = args.title;
    if (args.description !== undefined) todo.description = args.description;
    if (args.priority) todo.priority = args.priority;
    if (args.dueDate !== undefined) todo.dueDate = args.dueDate;

    await this.saveTodos();

    return {
      content: [
        {
          type: 'text',
          text: `✓ Todo #${args.id} updated!\n\n${JSON.stringify(todo, null, 2)}`,
        },
      ],
    };
  }

  async getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.status === 'completed').length;
    const pending = this.todos.filter(t => t.status === 'pending').length;
    const high = this.todos.filter(t => t.priority === 'high').length;
    const medium = this.todos.filter(t => t.priority === 'medium').length;
    const low = this.todos.filter(t => t.priority === 'low').length;

    const stats = {
      total,
      completed,
      pending,
      completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) + '%' : '0%',
      byPriority: {
        high,
        medium,
        low,
      },
    };

    return {
      content: [
        {
          type: 'text',
          text: `📊 Todo Statistics:\n\n${JSON.stringify(stats, null, 2)}`,
        },
      ],
    };
  }

  async run() {
    await this.loadTodos();
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Todo MCP server running on stdio');
  }
}

// Run the server
const server = new TodoMCPServer();
server.run().catch(console.error);
