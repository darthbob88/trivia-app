<script setup lang="ts">
import { ref } from 'vue';
import { type Question } from '@/stores/questions.ts';

const props = defineProps<{
  question: Question;
}>();

const answered = ref(false);
const selectedAnswer = ref('');
function submitanswer(guess: string) {
  answered.value = true;
  selectedAnswer.value = guess;
}

// TODO: Turn this into a proper AJAX call.
const hintUsed = ref(false);
const disabledIndices = ref<number[]>([]);
function useLifeline() {
  hintUsed.value = true;
  if (props.question.answers == undefined || props.question.answers.length < 4) {
    console.log('Not enough answers to disable');
    return;
  }
  if (props.question.correctAnswer == undefined) {
    console.log('No correct answer provided');
    return;
  }

  const correctIndex = props.question.answers.indexOf(props.question.correctAnswer);
  const possibles = [0, 1, 2, 3]
  possibles.splice(correctIndex, 1);
  const keptIndex = Math.floor(Math.random() * 3);
  possibles.splice(keptIndex, 1);
  disabledIndices.value = possibles;
}

function reset() {
  answered.value = false;
  selectedAnswer.value = '';
  hintUsed.value = false;
  disabledIndices.value = [];
}
</script>

<template>
  <section v-if="!answered" class="question-card">
    <div class="question">{{ props.question.text }}</div>
    <div class="answer">
      <button v-for="(answer, index) in props.question.answers" :key="answer" @click.once="submitanswer(answer)"
        :disabled="disabledIndices.includes(index)">
        {{ answer }}
      </button>
    </div>
    <button @click="useLifeline" :disabled="hintUsed">Hint</button>
  </section>
  <section v-else class="answer-card">
    <div class="question">{{ props.question.text }}</div>
    <div>
      <p v-if="selectedAnswer === props.question.correctAnswer">Correct!</p>
      <p v-else>You guessed {{ selectedAnswer }}, but the correct answer is {{ props.question.correctAnswer }}</p>
      <p v-if="props.question.additionalInfo">{{ props.question.additionalInfo }}</p>
      <button v-if="selectedAnswer !== props.question.correctAnswer" @click="reset">Try again</button>
      <a href="/random">Next Question</a>

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
