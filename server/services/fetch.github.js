// services/fetch.github.js
import axios from 'axios';

const GITHUB_USER = 'LukasLLaebel';
const GITHUB_API_URL = 'https://api.github.com';
const PINNED_API_URL = 'https://pinned.berrysauce.dev/get';

class GitHubService {
  async fetchAllProjects() {
    try {
      console.log(`[${new Date().toISOString()}] Fetching GitHub projects...`);

      const token = process.env.GITHUB_TOKEN;
      console.log('Using token:', token ? 'Yes' : 'No');

      // Create axios instance with auth header
      const axiosWithAuth = axios.create({
        headers: token ? {
          Authorization: `token ${token}`
        } : {}
      });

      // Fetch pinned repos - uses "name" not "repo"
      let pinnedNames = new Set();
      try {
        const pinnedRes = await axios.get(`${PINNED_API_URL}/${GITHUB_USER}`);
        console.log('===== PINNED REPOS =====');
        pinnedRes.data.forEach(p => console.log(`- ${p.name}`));
        console.log('===== END PINNED =====');

        // Extract "name" field from pinned API
        pinnedNames = new Set(pinnedRes.data.map(p => p.name));
        console.log('Pinned Names Set:', Array.from(pinnedNames));
      } catch (error) {
        console.warn('Could not fetch pinned repos:', error.message);
      }

      const reposRes = await axiosWithAuth.get(`${GITHUB_API_URL}/users/${GITHUB_USER}/repos`);
      const repos = reposRes.data;
      console.log('GitHub repos:', repos.map(r => r.name));

      const projects = await Promise.all(
        repos.map(async (repo) => {
          return await this.enrichRepoData(repo, pinnedNames, axiosWithAuth);
        })
      );

      console.log(`[${new Date().toISOString()}] Successfully fetched ${projects.length} projects`);
      return projects;
    } catch (error) {
      console.error('Error fetching GitHub projects:', error.message);
      throw error;
    }
  }

  async enrichRepoData(repo, pinnedNames, axiosWithAuth) {
    let languages = [];
    let toolsArray = [];

    try {
      const langRes = await axiosWithAuth.get(
        `${GITHUB_API_URL}/repos/${repo.owner.login}/${repo.name}/languages`
      );
      const langData = langRes.data;

      if (Object.keys(langData).length > 0) {
        const total = Object.values(langData).reduce((a, b) => a + b, 0);
        languages = Object.entries(langData)
          .map(([name, bytes]) => ({
            name,
            percent: parseFloat(((bytes / total) * 100).toFixed(1))
          }))
          .sort((a, b) => b.percent - a.percent);

        toolsArray = languages.map(l => l.name);
      }
    } catch (error) {
      console.warn(`Could not fetch languages for ${repo.name}:`, error.message);
      if (repo.language) {
        languages = [{ name: repo.language, percent: 100 }];
        toolsArray = [repo.language];
      }
    }

    const isPinned = pinnedNames.has(repo.name);
    console.log(`Checking: "${repo.name}" - isPinned: ${isPinned}`);

    return {
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description || 'No description',
      link: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isPinned,
      languages,
      primaryLanguage: languages[0]?.name || 'Unknown',
      tools: toolsArray,
      updatedAt: new Date().toISOString()
    };
  }
}

export default new GitHubService();
