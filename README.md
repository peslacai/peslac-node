# Peslac API Client

A Node.js package to interact with the Peslac API for document management and AI-powered tools.

## Installation

To install the Peslac API Client, run the following command in your project directory:

```bash
npm install peslac
```

## Usage

First, import the Peslac and create an instance with your API key:

```javascript
const Peslac = require('peslac');

const client = new Peslac('your-api-key-here');
```

### Example with local file

Here's a complete example demonstrating how to upload a document and use a tool:

First, make sure you have multer installed:

```bash
npm install multer
```

```bash
npm install peslac
```

```javascript
const express = require('express');
const multer = require('multer');
const Peslac = require('peslac'); // Import the Peslac package

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure Multer

const client = new Peslac('your-api-key-here'); // Initialize Peslac client

// Route to upload a file and use a tool
app.post('/useTool', upload.single('file'), async (req, res) => {
  const { tool_id, file } = req.body;
  try {
    // Validate the request body
    if (file || tool_id) {
      return res.status(400).json({
        success: false,
        message: 'File and tool_id are required',
      });
    }

    // Use the tool with the uploaded file and provided tool_id
    const result = await client.useTool(file, req.tool_id);

    res.status(200).json(result); // Send success response
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message, // Handle any errors
    });
  }
});
```

### Example with remote url

Here's an example demonstrating how to and use a tool with a remote document url:

```bash
npm install peslac
```

```javascript
const express = require('express');
const Peslac = require('peslac'); // Import the Peslac package

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure Multer

const client = new Peslac('your-api-key-here'); // Initialize Peslac client

// Route to upload a file and use a tool
app.post('/useTooUrl', async (req, res) => {
  const { tool_id, fileUrl } = req.body;
  try {
    // Validate the request body
    if (fileUrl || tool_id) {
      return res.status(400).json({
        success: false,
        message: 'File and tool_id are required',
      });
    }

    // Send the remote fileUrl and the tool_id
    const result = await client.useToolWithFileUrl(fileUrl, tool_id);

    res.status(200).json(result); // Send success response
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message, // Handle any errors
    });
  }
});
```

### Retrieve a document

To retrieve a document that has been previously uploaded to Peslac, you can use the `retrieveDocument` method. Here's an example:

```javascript
const express = require('express');
const Peslac = require('peslac'); // Import the Peslac package

const app = express();

const client = new Peslac('your-api-key-here'); // Initialize Peslac client

// Route to upload a file and use a tool
app.get('/documents/:documentId', async (req, res) => {
  const { documentId } = req.params;
  try {
    const result = await client.retrieveDocument(documentId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message, // Handle any errors
    });
  }
});
```

## API Reference

### `new Peslac(apiKey)`

Creates a new instance of the Peslac client.

- `apiKey` (string): Your Peslac API key.

Uploads a document to the Peslac API.

- `file` (string): Path to the file you want to upload.

Returns a Promise that resolves with the upload result.

### `client.useTool({ file, tool_Id })`

Uses an AI-powered tool on a document.

- `file` (string): Path to the file you want to process.
- `tool_Id` (string): ID of the tool you want to use.

Returns a Promise that resolves with the tool usage result.

## Error Handling

`useTool` method throw errors if the operations fail. It's recommended to use try-catch blocks or `.catch()` methods when calling these functions, as shown in the example above.

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact [support@peslac.com](mailto:support@peslac.com) or open an issue on the GitHub repository.
