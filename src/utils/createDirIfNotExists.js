import * as fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await fs.readFile(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
