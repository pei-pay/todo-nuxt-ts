<template>
  <div class="item">
    <input type="checkbox" @change="toggle(todo)" :checked="todo.completed" />
    <label
      v-if="!isEdit"
      @dblclick="editTodo"
      :class="{ completed: todo.completed }"
      >{{ todo.title }}</label
    >
    <input
      v-else
      type="text"
      class="edit"
      v-model="beforeEditCache"
      @keyup.enter="doneEdit"
      @blur="doneEdit"
      @keyup.esc="cancelEdit"
      v-focus
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  PropType,
  ref
} from "@nuxtjs/composition-api";
import Todo from "@/types/Todo";
import { TodoStore } from "@/composables/useTodo";
import TodoKey from "@/composables/useTodoKey";

export default defineComponent({
  props: {
    todo: {
      required: true,
      type: Object as PropType<Todo>
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  setup(props) {
    const { toggle, updateTodo } = inject(TodoKey) as TodoStore;
    const isEdit = ref<boolean>(false);
    const beforeEditCache = ref<string>("");
    const editTodo = () => {
      beforeEditCache.value = props.todo.title;
      isEdit.value = true;
    };
    const doneEdit = () => {
      if (beforeEditCache.value !== "") {
        updateTodo(props.todo, beforeEditCache.value);
      }
      isEdit.value = false;
    };
    const cancelEdit = () => {
      beforeEditCache.value = props.todo.title;
      isEdit.value = false;
    };
    return { isEdit, toggle, beforeEditCache, editTodo, doneEdit, cancelEdit };
  }
});
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
}
label {
  padding: 10px;
  margin-left: 12px;
}
.edit {
  padding: 10px;
  margin-left: 12px;
  width: 100%;
  border: 1px solid #ccc;
  font-size: 24px;
}
.edit:focus {
  outline: none;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
</style>
