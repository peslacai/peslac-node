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

```javascript
const Peslac = require('peslac');

const client = new Peslac('your-api-key-here');

(async () => {
  try {
    // Upload a file
    const uploadResponse = await client.upload({ file: 'path/to/file.pdf' });
    console.log('Uploaded:', uploadResponse);

    // Use a tool
    const toolResponse = await client.useTool({
      file: 'path/to/file.pdf',
      toolId: 'tool-id-here',
    });
    console.log('Tool Response:', toolResponse);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
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
