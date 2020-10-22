export default {
  port: 3010,
  storage: {
    url: process.env.STORAGE_URL || '',
    key: process.env.STORAGE_KEY || '',
    endpoint: process.env.STORAGE_ENDPOING || '',
    secret: process.env.STORAGE_SECRET || '',
    bucket: process.env.STORAGE_BUCKET || '',
  },
}
