<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]);

onMounted(async () => {
  try {
    // Use window.location.hostname to get the actual server IP
    const apiUrl = `http://${window.location.hostname}:3001/api/projects`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    projects.value = await res.json();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    projects.value = [];
  }
});

const getToolIcon = (toolName) => {
  const icons = {
    'PHP': 'fa-brands fa-php',
    'HTML': 'fa-brands fa-html5',
    'CSS': 'fa-brands fa-css3-alt',
    'JavaScript': 'fa-brands fa-js',
    'Vue': 'fa-brands fa-vuejs',
    'Node.js': 'fa-brands fa-node-js'
  };
  return icons[toolName] || 'fa-solid fa-code';
}
</script>

<template>
<main class="projects">
      <h1>Projects</h1>
      <div class="projects-wrapper">
        <div class="project" v-for="project in projects" :key="project.id">
        <!--<div class="project" v-if="project.isPinned" :key="project.id"> -->
          <h4>{{ project.name }}</h4>
          <div class="purple-line"></div>
          <div class="blue-line"></div>
          <p>{{ project.description }}</p>
          <div class="tools">
            <div v-for="tool in project.tools" :key="tool" class="tool-bg">
              <i :class="getToolIcon(tool)"></i>
              <p class="mini">{{ tool }}</p>
            </div>
          </div>
          <div class="meta-row">
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <p class="mini">10</p>
            </div>
            <a target="_blank" v-bind:href="project.link">
              <div class="go-to">
                <i class="fa-brands fa-github"></i>
                <i class="fa-solid fa-up-right-from-square"></i>
              </div>
            </a>
          </div>
        </div> 
      </div>
    </main>

</template>

<style scoped>

</style>
