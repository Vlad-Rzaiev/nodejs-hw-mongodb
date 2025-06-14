import { TMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/contacts.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();

  await createDirIfNotExists(TMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  setupServer();
};

void bootstrap();
