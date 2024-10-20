require('dotenv').config();
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
        'X-API-Key': this.apiKey,
      },
    });
  }

  // Upload document
  // async upload(file) {
  //   try {
  //     const formData = new FormData();
  //     formData.append(
  //       'file',
  //       this._getFileBuffer(file),
  //       this._getFileName(file)
  //     );

  //     const response = await this.api.post('/documents', formData, {
  //       headers: formData.getHeaders(),
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(`Upload failed: ${error.message}`);
  //   }
  // }

  // Get document
  async retrieveDocument(documentId) {
    try {
      const response = await this.api.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }

  // Use a tool with file and toolId
  async useTool(file, tool_id) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      formData.append('tool_id', tool_id);

      const response = await this.api.post('/tools/use', formData, {
        ...formData.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }

  // Use a tool with url and toolId
  async useToolWithFileUrl(fileUrl, tool_id) {
    try {
      const response = await this.api.post('/tools/use-url', {
        fileUrl,
        tool_id,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }

  async submitBankStatement(file, typeOfAccount, currency) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      formData.append('type_of_account', typeOfAccount);
      formData.append('currency', currency);

      const response = await this.api.post('/bank-statements/pdf', formData, {
        ...formData.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to submit bank statement'
      );
    }
  }

  async getBankStatement(documentId) {
    const response = await this.api.get(`/bank-statements/${documentId}`);
    return response.data;
  }

  _getFileBuffer(file) {
    if (typeof file === 'string') {
      return fs.readFileSync(file);
    } else if (file instanceof Buffer) {
      return file;
    } else if (file && file.buffer) {
      return file.buffer;
    } else {
      throw new Error(
        'Invalid file input. Expected a file path, Buffer, or multer file object.'
      );
    }
  }

  _getFileName(file) {
    if (typeof file === 'string') {
      return file.split('/').pop();
    } else if (file && file.originalname) {
      return file.originalname;
    } else {
      return 'file';
    }
  }
}

module.exports = Peslac;
