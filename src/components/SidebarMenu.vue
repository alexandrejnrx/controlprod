<template>
  <Transition name="fade">
    <div v-if="isVisible" class="sidebar-overlay" @click="$emit('close')"></div>
  </Transition>

  <Transition name="slide">
    <aside class="right-aside" v-if="isVisible">
      <div class="profile-container">
        <div class="icon-container">
          <span class="user-icon">
            <img src="@/assets/svg/profile.svg" alt="imagem do usuário" />
          </span>
        </div>
        <span class="name">{{ userName }}</span>
      </div>

      <h2 class="aside-title">Opções</h2>

      <nav class="aside-nav">
        <button
          v-for="menuItem in menuItems"
          :key="menuItem.id"
          class="action-btn"
          @click="handleMenuClick(menuItem.action)"
        >
          <span>{{ menuItem.label }}</span>
          <span class="menu-icon">
            <img :src="menuItem.icon" :alt="menuItem.label" />
          </span>
        </button>
      </nav>
    </aside>
  </Transition>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default: 'Nome do Usuário',
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['menu-action', 'close'])

function handleMenuClick(action) {
  emit('menu-action', action)
  emit('close')
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.right-aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #ffffffff;
  width: 250px;
  border-left: 1px solid var(--border-color);
  overflow-y: auto;
  z-index: 1000;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.profile-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
}

.icon-container {
  background-color: #eeeeee;
  border-radius: 50%;
  padding: 1rem;
}

.user-icon img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.name {
  text-align: center;
  padding: 0.5rem;
  font-weight: 500;
}

.aside-title {
  display: flex;
  justify-content: right;
  flex-direction: column;
  margin: 0 0 1.5rem 0;
  padding: 0 1rem;
}

.aside-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  background-color: var(--primary-color);
  cursor: pointer;
  border: none;
  gap: 1rem;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #eeeeee;
}

.action-btn span {
  display: flex;
  align-items: center;
}

.menu-icon img {
  width: 24px;
  height: 24px;
}
</style>
