<template>
  <input
    type="text"
    placeholder="What needs to be done"
    v-model="newTodo.title"
    @keyup.enter="handleAdd"
  />
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "@nuxtjs/composition-api";
import { TodoStore } from "@/composables/useTodo";
import TodoKey from "@/composables/useTodoKey";

export default defineComponent({
  setup() {
    const newTodo = reactive({
      title: "",
      id: 4
    });

    const { addTodo } = inject(TodoKey) as TodoStore;

    const handleAdd = () => {
      if (newTodo.title == "") {
        return;
      }
      addTodo({
        id: newTodo.id,
        title: newTodo.title,
        completed: false
      });
      newTodo.title = "";
      newTodo.id++;
    };
    return { handleAdd, newTodo };
  }
});
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
input:focus {
  outline: none;
}
</style>
