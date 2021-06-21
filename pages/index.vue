<template>
  <div class="container">
    <TodoAdd />
    <TodoList />
    <TodoExtra />
    <TodoFilter />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "@nuxtjs/composition-api";
import TodoList from "@/components/TodoList.vue";
import TodoAdd from "@/components/TodoAdd.vue";
import TodoExtra from "@/components/TodoExtra.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import useTodo from "@/composables/useTodo";
import useTodoKey from "@/composables/useTodoKey";

export default defineComponent({
  components: {
    TodoList,
    TodoAdd,
    TodoExtra,
    TodoFilter
  },
  setup() {
    provide(useTodoKey, useTodo());
    const { remaining } = useTodo();

    return { remaining };
  }
});
</script>
