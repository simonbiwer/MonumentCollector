const localhostIP = '192.168.2.134';
const port = '3000';

export const BACKEND_BASE_URL = `http://${localhostIP}:${port}`;
export const COLLECTION_API_URL = `${BACKEND_BASE_URL}/api/collection`;
export const MONUMENT_API_URL = `${BACKEND_BASE_URL}/api/monument`;