<script setup lang="ts">
import { getReportCard } from '@/stores/questions';
import { onMounted, ref } from 'vue';


const accuracy = ref<number>(0);
const learnings = ref<string[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const loadReportCard = async () => {
  try {
    const response = await getReportCard();
    let numCorrect = 0;
    const seenQuestionIDs = new Set<number>();
    for (const report of response) {
      if (report.isCorrect) {
        numCorrect++
      } else if (!seenQuestionIDs.has(report.questionId) && report.comment) {
        seenQuestionIDs.add(report.questionId);
        learnings.value.push(report.comment);
      }
    }
    accuracy.value = numCorrect / response.length * 100;

  } catch (err: unknown) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadReportCard();
});

</script>

<template>
  <div class="greetings">
    <h1 class="green">Report Card</h1>
    <p>Congratulations on your trivia performance!</p>
    <p>You got {{ accuracy.toFixed(2) }}% correct, and learned:</p>
    <ul>
      <li v-for="learning in learnings" :key="learning">{{ learning }}</li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  display: none;
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
