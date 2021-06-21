<template>
  <div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <TodoItem :todo="todo" />
        <div class="remove" @click="deleteTodo(todo)">
          &times;
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@nuxtjs/composition-api";
import TodoItem from "@/components/TodoItem.vue";
import { TodoStore } from "@/composables/useTodo";
import TodoKey from "@/composables/useTodoKey";

export default defineComponent({
  components: {
    TodoItem
  },
  setup() {
    const { filteredTodos, deleteTodo } = inject(TodoKey) as TodoStore;
    return { filteredTodos, deleteTodo };
  }
});
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.remove {
  cursor: pointer;
  margin-left: 14px;
}
.remove:hover {
  color: #ff7f7f;
}
</style>
