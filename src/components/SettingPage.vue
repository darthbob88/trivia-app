<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  getAllCategories,
  getUserSelectedCategories,
  saveUserSelectedCategories,
} from '../stores/categories'

const defaults = { sound: true, timer: true, difficulty: 'Medium', theme: 'light' }
const settings = reactive({ ...defaults })
const categories = getAllCategories()
const savedCategories = getUserSelectedCategories()
const selectedCategoryIds = ref(
  savedCategories.length > 0 ? savedCategories.map((category) => category.id) : categories.map((category) => category.id),
)
const saved = ref(false)

function saveSettings() {
  saveUserSelectedCategories(selectedCategoryIds.value)
  saved.value = true
  window.setTimeout(() => { saved.value = false }, 2500)
}

function resetSettings() {
  Object.assign(settings, defaults)
  selectedCategoryIds.value = categories.map((category) => category.id)
  saved.value = false
}
</script>

<template>
  <main class="settings-page">
    <section class="settings-card" aria-labelledby="settings-title">
      <header class="page-header">
        <div>
          <p class="eyebrow">Account preferences</p>
          <h1 id="settings-title">Settings</h1>
          <p class="subtitle">Customize your trivia experience.</p>
        </div>
        <div class="avatar" aria-hidden="true">TBD</div>
      </header>

      <div class="settings-content">
        <!-- Not yet implemented, but will be in the future.

        <section class="settings-section">
          <h2>Game preferences</h2>
          <p class="section-description">Choose how you want to play.</p>

          <label class="setting-row">
            <span>
              <strong>Sound effects</strong>
              <small>Play sounds for correct and incorrect answers.</small>
            </span>
            <input v-model="settings.sound" class="switch-input" type="checkbox" />
            <span class="switch" aria-hidden="true"></span>
          </label>

          <label class="setting-row">
            <span>
              <strong>Timer</strong>
              <small>Show a countdown while answering questions.</small>
            </span>
            <input v-model="settings.timer" class="switch-input" type="checkbox" />
            <span class="switch" aria-hidden="true"></span>
          </label>

          <label class="field-row" for="difficulty">
            <span>
              <strong>Default difficulty</strong>
              <small>Set the difficulty used for new games.</small>
            </span>
            <select id="difficulty" v-model="settings.difficulty">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </section>

        <section class="settings-section">
          <h2>Appearance</h2>
          <p class="section-description">Make the app feel like yours.</p>

          <div class="theme-row">
            <span>
              <strong>Theme</strong>
              <small>Select your preferred color theme.</small>
            </span>
            <div class="theme-options" role="radiogroup" aria-label="Theme">
              <button v-for="theme in themes" :key="theme.value" class="theme-option"
                :class="{ selected: settings.theme === theme.value }" type="button"
                :aria-pressed="settings.theme === theme.value" @click="settings.theme = theme.value">
                {{ theme.label }}
              </button>
            </div>
          </div>
        </section> -->

        <section class="settings-section">
          <h2>Categories</h2>
          <p class="section-description">Choose the topics included in your games.</p>

          <div class="category-options">
            <label v-for="category in categories" :key="category.id" class="category-option">
              <input v-model="selectedCategoryIds" type="checkbox" :value="category.id" />
              <span>{{ category.name }}</span>
            </label>
          </div>
        </section>

        <section class="settings-section account-section">
          <h2>Account</h2>
          <p class="section-description">Manage your account and data.</p>
          <button class="danger-button" type="button" @click="resetSettings">Reset settings</button>
        </section>
      </div>

      <footer class="actions">
        <span v-if="saved" class="saved-message" role="status">Settings saved</span>
        <button class="save-button" type="button" @click="saveSettings">Save changes</button>
      </footer>
    </section>
  </main>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  color: #17213b;
  background: #f4f7ff;
}

.settings-page {
  min-height: 100vh;
  padding: 48px 20px;
  background: linear-gradient(135deg, #f8faff, #edf1ff);
}

.settings-card {
  max-width: 760px;
  margin: auto;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e3e8f5;
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(46, 65, 125, .1);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 38px 44px 30px;
  border-bottom: 1px solid #edf0f7;
}

.eyebrow {
  margin: 0 0 8px;
  color: #6378dd;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 32px;
  letter-spacing: -.04em;
}

.subtitle,
.section-description,
small {
  color: #77819a;
}

.subtitle {
  margin: 8px 0 0;
  font-size: 15px;
}

.avatar {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  color: #fff;
  background: #6678de;
  border-radius: 50%;
  font-size: 19px;
  font-weight: 700;
}

.settings-content {
  padding: 8px 44px 22px;
}

.settings-section {
  padding: 25px 0;
  border-bottom: 1px solid #edf0f7;
}

.settings-section:last-child {
  border-bottom: 0;
}

h2 {
  margin: 0 0 5px;
  font-size: 17px;
}

.section-description {
  margin: 0 0 17px;
  font-size: 13px;
}

.setting-row,
.field-row,
.theme-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 15px 0;
}

strong,
small {
  display: block;
}

strong {
  font-size: 14px;
  font-weight: 600;
}

small {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.4;
}

.switch-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switch {
  position: relative;
  flex: 0 0 auto;
  width: 43px;
  height: 24px;
  background: #d9deeb;
  border-radius: 20px;
  transition: .2s;
}

.switch::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  content: '';
  box-shadow: 0 1px 3px #abb3c6;
  transition: .2s;
}

.switch-input:checked+.switch {
  background: #6678de;
}

.switch-input:checked+.switch::after {
  transform: translateX(19px);
}

select {
  padding: 9px 28px 9px 12px;
  color: #303a56;
  background: #fff;
  border: 1px solid #dce2ef;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
}

.theme-options {
  display: flex;
  gap: 7px;
  padding: 4px;
  background: #f1f3f9;
  border-radius: 9px;
}

.theme-option {
  padding: 8px 12px;
  color: #77819a;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.theme-option.selected {
  color: #303d85;
  background: #fff;
  box-shadow: 0 2px 5px rgba(30, 45, 90, .1);
  font-weight: 600;
}

.category-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.category-option {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 9px 12px;
  color: #303a56;
  border: 1px solid #dce2ef;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

.category-option:has(input:checked) {
  color: #303d85;
  background: #f3f5ff;
  border-color: #aeb8ed;
}

.category-option input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #6678de;
}

.danger-button {
  padding: 9px 13px;
  color: #c45562;
  background: #fff;
  border: 1px solid #f0cfd4;
  border-radius: 7px;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 44px;
  background: #fafbfe;
}

.saved-message {
  color: #4b9a70;
  font-size: 12px;
}

.save-button {
  padding: 11px 19px;
  color: #fff;
  background: #6678de;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
}

.save-button:hover {
  background: #5366d1;
}

@media (max-width: 600px) {
  .settings-page {
    padding: 20px 12px;
  }

  .page-header,
  .settings-content {
    padding-left: 24px;
    padding-right: 24px;
  }

  .actions {
    padding: 18px 24px;
  }

  .setting-row,
  .field-row,
  .theme-row {
    align-items: flex-start;
  }

  .theme-row {
    display: block;
  }

  .theme-options {
    margin-top: 14px;
    width: max-content;
  }

  .category-options {
    grid-template-columns: 1fr;
  }
}
</style>
