<script setup lang="ts">
import { getUserSelectedCategories } from '@/stores/categories';
import { getQuestionById, getRandomQuestionId, type Question } from '@/stores/questions';
import { onMounted, ref } from 'vue';
import QuestionCard from '@/components/QuestionCard.vue';

const info = ref<Question | undefined>(undefined);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);


const selectedCategories = ref<number[]>(getUserSelectedCategories());

const getQuestion = async () => {
  try {

    // TODO: Turn this into a proper AJAX call, possibly consolidating.
    const questionId = await getRandomQuestionId(selectedCategories.value);
    const response = await getQuestionById(questionId);
    info.value = response;
  } catch (err: unknown) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getQuestion();
});


</script>

<template>



  <div v-if="loading">Loading data...</div>

  <!-- Error State -->
  <div v-else-if="error">Error: {{ error }}</div>

  <!-- Data Display -->
  <div v-else-if="info">
    <QuestionCard :question="info" />
  </div>

  <div v-else>No data available.</div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
