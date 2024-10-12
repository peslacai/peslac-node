const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data'); // Import FormData
const config = require('./config.json');

class Peslac {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.api = axios.create({
      baseURL: config.apiBaseUrl, // Load from config
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  // Upload document
  async upload({ file }) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file));

      const response = await this.api.post('/documents', formData, {
        headers: formData.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  // Use a tool with file and toolId
  async useTool({ file, toolId }) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file));
      formData.append('toolId', toolId);

      const response = await this.api.post('/tools/use', formData, {
        headers: formData.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Tool usage failed: ${error.message}`);
    }
  }
}

module.exports = Peslac;
