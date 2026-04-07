<script setup>
import { ref } from 'vue';

// not working yet :)
const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};
</script>

<template>
    <nav>
      <!--<h4 class="logo">Lukas Leander Laebel</h4> -->
      <h4><router-link to="/" class="nav-link">Lukas Leander Laebel</router-link></h4>
      <h4><router-link to="/about" class="nav-link">About</router-link></h4>
      <h4><router-link to="/projects" class="nav-link">Projects</router-link></h4>
      <h4 class="nav-link">Timeline</h4>
      <h4 class="nav-link">Blog</h4>
      <h4><router-link to="/contact" class="nav-link">Contact</router-link></h4>
      <div class="theme-toggle" @click="toggleTheme">
        <i v-if="!isDark" class="fa-regular fa-sun"></i>
        <i v-else class="fa-regular fa-moon"></i>
      </div>
    </nav>
</template>

<style scoped>
nav {
  background-color: var(--navy-200);
  opacity: 0.5;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

}

nav .nav-link {
  color: var(--gray-200);
  font-weight: 100;
  text-decoration: none;
}

nav .nav-link:active, nav .nav-link:hover {
  color: var(--blue-200);
}


nav i {
  font-size: 18px;
  color: var(--gray-200);

}

.theme-toggle {
  position: relative;
  width: 20px;
  height: 20px;
}

.theme-toggle i {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.fa-sun {
  opacity: 0;
}

.fa-moon {
  opacity: 1;
}

.theme-toggle.active .fa-sun {
  opacity: 1;
}

.theme-toggle.active .fa-moon {
  opacity: 0;
}

</style>

