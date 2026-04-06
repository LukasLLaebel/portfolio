<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]);

onMounted(async () => {
  const res = await fetch('http://localhost:3001/api/projects');
  projects.value = await res.json();
});

const addProject = async () => {
  await fetch('http://localhost:3001/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      title: 'New Project', 
      description: 'Description' 
    })
  });
  // Refresh projects
  const res = await fetch('http://localhost:3001/api/projects');
  projects.value = await res.json();
};
</script>

<template>
  <div>
    <div v-for="project in projects" :key="project.id">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>
