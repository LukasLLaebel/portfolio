<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]);

onMounted(async () => {
  const res = await fetch('http://localhost:3001/api/projects');
  projects.value = await res.json();
});

/*
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.body.classList.toggle('dark', isDark.value)

  
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      isDark.value = true
        document.body.classList.add('dark')
    }
  })
  */
</script>

<template>
  <nav>
    <h4 class="logo">Lukas Leander Laebel</h4>
    <h4 class="nav-link">Home</h4>
    <h4 class="nav-link">Projects</h4>
    <h4 class="nav-link">Timeline</h4>
    <h4 class="nav-link">Blog</h4>
    <h4 class="nav-link">Contact</h4>
    <div class="theme-toggle" @click="toggleTheme">
      <i v-if="!isDark" class="fa-regular fa-sun"></i>
      <i v-else class="fa-regular fa-moon"></i>
    </div>
  </nav>

  <main class="hero">
    <section class="about">
      <img alt="profile" src="../assets/profile.png" class="profile-pic">
      <div class="profile-shadow"></div>
      <h1>Lukas Leander Laebel</h1>
      <div class="socials">
        <a href="https://linkedin.com" target="_blank">
          <i class="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="https://github.com" target="_blank">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <div class="about-textbox">
        <h3>Software | Design | Networking | Cyber-security</h3>
        <h4>
          I am a passionate technology enthusiast with a creative side. 
          I love building, tinkering, this can be seen with me working on my own homelab, 
          always experimenting with new hardware and software. 
          My interests also include creating abstract drawings (often inspired by sea life) and writing. 
          I have started my own book! I thrive when being part of something bigger, 
          which is why I have applied to the Danish Home Guard ("Hjemmeværnet").
        </h4>
      </div> 
    </section>

    <section class="github">
      <h3>GitHub Stats</h3>
      <div class="github-stats">
        <div class="repos">
          <i class="fa-solid fa-book"></i>
          <p class="p2">55</p>
          <p class="text p2">Repositories</p>
        </div>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <p class="p2">55</p>
          <p class="text p2">Stars</p>
        </div> 
        <div class="followers">
          <i class="fa-solid fa-user-plus"></i>
          <p class="p2">55</p>
          <p class="text p2">Followers</p>
        </div>
        <div class="following">
          <i class="fa-solid fa-user-check"></i>
          <p class="p2">55</p>
          <p class="text p2">Following</p>
        </div>
      </div>
      <div class="chart-wrapper">
        <h4>Most used languages</h4>
        <div class="chart"></div>
      </div> 
    </section>

    <section class="projects">
      <h3>Featured projects</h3>
      <div class="projects-wrapper">
        <div class="project" v-for="project in projects" :key="project.id">
          <h4>{{ project.title }}</h4>
          <div class="purple-line"></div>
          <div class="blue-line"></div>
          <p>{{ project.description }}</p>
          <div class="tools">
            <div class="tool-bg">
              <i class="fa-brands fa-php"></i>
              <p class="mini">PHP</p>
            </div>
            <div class="tool-bg">
              <i class="fa-brands fa-html5"></i>
              <p class="mini">HTML</p>
            </div>
            <div class="tool-bg">
              <i class="fa-brands fa-css3-alt"></i>
              <p class="mini">CSS</p>
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
    </section>

    <section class="tech-stack">
      <h3>Tech Stack</h3>
      <div class="tech-wrapper">
        <div class="tech-01">
          <div class="logo-wrapper">
            <i class="fab fa-js"></i>
          </div>
          <p class="mini">JavaScript</p>
        </div>
        <div class="tech-02">
          <div class="logo-wrapper">
            <i class="fab fa-php"></i>
          </div>
          <p class="mini">PHP</p>
        </div>
        <div class="tech-03">
          <div class="logo-wrapper">
            <i class="fab fa-html5"></i>
          </div>
          <p class="mini">HTML</p>
        </div>
        <div class="tech-04">
          <div class="logo-wrapper">
            <i class="fab fa-css3-alt"></i>
          </div>
          <p class="mini">CSS</p>
        </div>
        <div class="tech-05">
          <div class="logo-wrapper">
            <i class="fab fa-node-js"></i>
          </div>
          <p class="mini">Node.js</p>
        </div>
        <div class="tech-06">
          <div class="logo-wrapper">
            <i class="fab fa-react"></i>
          </div>
          <p class="mini">React</p>
        </div>
        <div class="tech-07">
          <div class="logo-wrapper">
            <i class="fab fa-vuejs"></i>
          </div>
          <p class="mini">Vue.js</p>
        </div>
        <div class="tech-08">
          <div class="logo-wrapper">
            <i class="fab fa-python"></i>
          </div>
          <p class="mini">Python</p>
        </div>
        <div class="tech-09">
          <div class="logo-wrapper">
            <i class="fab fa-java"></i>
          </div>
          <p class="mini">Java</p>
        </div>
        <div class="tech-10">
          <div class="logo-wrapper">
            <i class="fab fa-git-alt"></i>
          </div>
          <p class="mini">Git</p>
        </div>
      </div>
    </section>
  </main>
</template>




