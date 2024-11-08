import packageJson from '@/package.json';

export const getPackageInfo = () => {
  return {
    name: packageJson.name, // Service name from package.json
    version: packageJson.version, // Service version from package.json
    environment: process.env.NODE_ENV, // Application environment (development, production, etc.)
  };
};

export const getRuntimeInfo = () => {
  return {
    processId: process.pid, // Process ID
    uptime: Math.floor(process.uptime()), // Uptime in seconds
    uptimeInMilliseconds: process.uptime() * 1000, // Uptime in milliseconds
    timestamp: new Date().toISOString(), // Current timestamp
  };
};

export const getSystemInfo = () => {
  const memoryUsage = process.memoryUsage();

  // Convert bytes to megabytes
  const bytesToMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
  return {
    platform: process.platform, // System's platform
    architecture: process.arch, // System's architecture
    nodeVersion: process.version, // Node.js version
    memoryUsage: {
      rss: {
        bytes: memoryUsage.rss, // Resident Set Size in bytes
        megabytes: bytesToMB(memoryUsage.rss), // Resident Set Size in megabytes
        description: 'Total memory allocated for the process execution',
      },
      heapTotal: {
        bytes: memoryUsage.heapTotal, // Total size of the allocated heap in bytes
        megabytes: bytesToMB(memoryUsage.heapTotal), // Total size of the allocated heap in megabytes
        description: 'Total size of the allocated heap',
      },
      heapUsed: {
        bytes: memoryUsage.heapUsed, // Actual memory used during the execution in bytes
        megabytes: bytesToMB(memoryUsage.heapUsed), // Actual memory used during the execution in megabytes
        description: 'Actual memory used during the execution',
      },
      external: {
        bytes: memoryUsage.external, // Memory usage of C++ objects bound to JavaScript objects managed by V8 in bytes
        megabytes: bytesToMB(memoryUsage.external), // Memory usage of C++ objects in megabytes
        description:
          'Memory usage of C++ objects bound to JavaScript objects managed by V8',
      },
    },
    cpuUsage: process.cpuUsage(), // CPU usage of the Node.js process}
  };
};
