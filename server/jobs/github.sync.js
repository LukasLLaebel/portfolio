import cron from 'node-cron';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import githubService from '../services/fetch.github.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../db.json');

class GitHubSyncJob {
  constructor() {
    this.isRunning = false;
  }

  start() {
    // Run every day at 2 AM
    this.task = cron.schedule('0 2 * * *', async () => {
      await this.syncProjects();
    });

    console.log('GitHub sync job scheduled (daily at 2 AM)');
  }

  stop() {
    if (this.task) {
      this.task.stop();
      console.log('GitHub sync job stopped');
    }
  }

  async syncProjects() {
    if (this.isRunning) {
      console.warn('Sync already in progress, skipping...');
      return;
    }

    this.isRunning = true;

    try {
      console.log(`[${new Date().toISOString()}] Starting GitHub sync...`);

      // Fetch fresh data
      const projects = await githubService.fetchAllProjects();

      // Read current db.json
      let dbData = { projects: [] };
      try {
        const dbContent = await fs.readFile(DB_PATH, 'utf-8');
        dbData = JSON.parse(dbContent);
      } catch (error) {
        console.warn('Could not read db.json, creating new one');
      }

      // Update projects in db.json
      dbData.projects = projects;
      dbData.lastSync = new Date().toISOString();

      // Write back to db.json
      await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

      console.log(`[${new Date().toISOString()}] GitHub sync completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] GitHub sync failed:`, error.message);
    } finally {
      this.isRunning = false;
    }
  }
}

export default new GitHubSyncJob();
