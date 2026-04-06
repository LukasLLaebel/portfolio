import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from './components/hero.vue'
import AboutSection from './components/about.vue'
import ProjectsSection from './components/projects.vue'
import ContactSection from './components/contact.vue'
import Layout from './components/fixed-content/layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'Home', component: HeroSection },
      { path: 'about', name: 'About', component: AboutSection },
      { path: 'projects', name: 'Projects', component: ProjectsSection },
      { path: 'contact', name: 'Contact', component: ContactSection }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
