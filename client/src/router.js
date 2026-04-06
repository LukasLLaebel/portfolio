import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from './components/hero.vue'
import AboutSection from './components/about.vue'
import ProjectsSection from './components/projects.vue'
import ContactSection from './components/contact.vue'

const routes = [
  {
    path: '/',
    component: HeroSection
  },
  {
    path: '/about',
    component: AboutSection
  },
  {
    path: '/projects',
    component: ProjectsSection
  },
  {
    path: '/contact',
    component: ContactSection
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
