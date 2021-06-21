<template>
  <div class="extra-container">
    <div>
      <label>
        <input
          type="checkbox"
          @change="checkAllTodo"
          :checked="!anyRemaining"
        />
        Check All</label
      >
    </div>
    <div>{{ remaining }} items left</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "@nuxtjs/composition-api";
import { TodoStore } from "@/composables/useTodo";
import TodoKey from "@/composables/useTodoKey";

export default defineComponent({
  setup() {
    const { remaining, checkAllTodo } = inject(TodoKey) as TodoStore;
    const anyRemaining = computed(() => {
      return remaining.value !== 0;
    });
    return { remaining, checkAllTodo, anyRemaining };
  }
});
</script>
