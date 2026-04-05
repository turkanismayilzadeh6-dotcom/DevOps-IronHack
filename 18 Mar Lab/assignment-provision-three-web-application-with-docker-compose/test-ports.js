const http = require('http');

const testPort = (port) => {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ port, status: res.statusCode, message: response.message });
        } catch (e) {
          resolve({ port, status: res.statusCode, message: 'Invalid JSON response' });
        }
      });
    });
    
    req.on('error', () => {
      resolve({ port, status: 'ERROR', message: 'Connection failed' });
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve({ port, status: 'TIMEOUT', message: 'Request timeout' });
    });
  });
};

const testNotesAPI = (port) => {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/notes`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ port, status: res.statusCode, message: `Found ${response.length} notes` });
        } catch (e) {
          resolve({ port, status: res.statusCode, message: 'Invalid JSON response' });
        }
      });
    });
    
    req.on('error', () => {
      resolve({ port, status: 'ERROR', message: 'Connection failed' });
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve({ port, status: 'TIMEOUT', message: 'Request timeout' });
    });
  });
};

async function main() {
  console.log('🔍 Testing application ports...\n');
  
  // Test common ports
  const ports = [3000, 3001, 3002, 8080, 8000];
  
  console.log('Testing health endpoints:');
  for (const port of ports) {
    const result = await testPort(port);
    if (result.status === 200) {
      console.log(`✅ Port ${port}: ${result.message}`);
    }
  }
  
  console.log('\nTesting notes API endpoints:');
  for (const port of ports) {
    const result = await testNotesAPI(port);
    if (result.status === 200) {
      console.log(`✅ Port ${port}: ${result.message}`);
    }
  }
  
  console.log('\n📋 Summary:');
  console.log('- Frontend should be on: http://localhost:3000');
  console.log('- Backend should be on: http://localhost:3001');
  console.log('- Database should be on: localhost:5432');
}

main().catch(console.error);
