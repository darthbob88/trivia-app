<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  question: String,
  answers: Array<string>,
  correctAnswer: String,
})

const answered = ref(false);
const selectedAnswer = ref('');
function submitanswer(guess: string) {
  answered.value = true;
  selectedAnswer.value = guess;
}

const disabledIndices = ref<number[]>([]);
const hintUsed = ref(false);
function useLifeline() {
  hintUsed.value = true;
  if (props.answers == undefined || props.answers.length < 4) {
    console.log('Not enough answers to disable');
    return;
  }
  if (props.correctAnswer == undefined) {
    console.log('No correct answer provided');
    return;
  }

  const correctIndex = props.answers.indexOf(props.correctAnswer);
  const possibles = [0, 1, 2, 3]
  possibles.splice(correctIndex, 1);
  const keptIndex = Math.floor(Math.random() * 3);
  possibles.splice(keptIndex, 1);
  disabledIndices.value = possibles;
}
</script>

<template>
  <section v-if="!answered" class="question-card">
    <div class="question">{{ question }}</div>
    <div class="answer">
      <button v-for="(answer, index) in answers" :key="answer" @click.once="submitanswer(answer)"
        :disabled="disabledIndices.includes(index)">
        {{ answer }}
      </button>
    </div>
    <button @click="useLifeline" :disabled="hintUsed">Hint</button>
  </section>
  <section v-else class="answer-card">
    <div class="question">{{ question }}</div>
    <div>
      <p v-if="selectedAnswer === correctAnswer">Correct!</p>
      <p v-else>You guessed {{ selectedAnswer }}, but the correct answer is {{ correctAnswer }}</p>
      <p>Some more waffle about the correct answer.</p>
      <button @click="answered = false">Try again</button>

    </div>
  </section>
</template>

<style>
.question-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading);
}

/* TODO: Get something responsive. */
.answer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
}
</style>
