<template>
  <div class="extra-container">
    <div>
      <button
        v-for="list in filterLists"
        :key="list"
        @click="changeFilter(list)"
        :class="{ active: filter == list }"
      >
        {{ list }}
      </button>
    </div>
    <transition name="fade" tag="div">
      <button
        class="warning"
        @click="clearCompleted"
        v-if="showClearCompletedButton"
      >
        Clear Completed
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "@nuxtjs/composition-api";
import { TodoStore } from "@/composables/useTodo";
import TodoKey from "@/composables/useTodoKey";

export default defineComponent({
  setup() {
    const {
      changeFilter,
      filter,
      clearCompleted,
      showClearCompletedButton
    } = inject(TodoKey) as TodoStore;
    const filterLists = ref(["All", "Ongoing", "Completed"]);
    return {
      filterLists,
      changeFilter,
      filter,
      clearCompleted,
      showClearCompletedButton
    };
  }
});
</script>
