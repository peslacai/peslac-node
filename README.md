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

### Example

Here's a complete example demonstrating how to upload a document and use a tool:

First, make sure you have multer installed:

```bash
npm install multer
```

```javascript
const express = require('express');
const multer = require('multer');
const Peslac = require('peslac'); // Import the Peslac package

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure Multer

const client = new Peslac('your-api-key-here'); // Initialize Peslac client

// Route to upload a file and use a tool
app.post('/api/v1/tools/use', upload.single('file'), async (req, res) => {
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
    const result = await client.useTool(req.file, req.body.tool_id);

    res.status(200).json(result); // Send success response
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

### `client.upload({ file })`

Uploads a document to the Peslac API.

- `file` (string): Path to the file you want to upload.

Returns a Promise that resolves with the upload result.

### `client.useTool({ file, toolId })`

Uses an AI-powered tool on a document.

- `file` (string): Path to the file you want to process.
- `toolId` (string): ID of the tool you want to use.

Returns a Promise that resolves with the tool usage result.

## Error Handling

Both `upload` and `useTool` methods throw errors if the operations fail. It's recommended to use try-catch blocks or `.catch()` methods when calling these functions, as shown in the example above.

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact [support@peslac.com](mailto:support@peslac.com) or open an issue on the GitHub repository.
