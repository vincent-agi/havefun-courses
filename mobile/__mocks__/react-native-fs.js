module.exports = {
  DocumentDirectoryPath: '/mock/documents',
  downloadFile: () => ({
    promise: Promise.resolve({ statusCode: 200 }),
  }),
};
