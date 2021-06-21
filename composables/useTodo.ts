import { reactive, computed } from "@nuxtjs/composition-api";
import Todo from "@/types/Todo";
import FilterTerm from "@/types/FilterTerm";
const useTodo = () => {
  const state = reactive<{
    todos: Todo[];
    filter: FilterTerm;
  }>({
    todos: [
      { id: 1, title: "laundry", completed: false },
      { id: 2, title: "wash dishes", completed: false },
      { id: 3, title: "clean the house", completed: false }
    ],
    filter: "All"
  });

  const changeFilter = (newFilter: FilterTerm) => {
    state.filter = newFilter;
  };

  const filteredTodos = computed(() => {
    if (state.filter == "Ongoing") {
      return state.todos.filter(todo => !todo.completed);
    } else if (state.filter == "Completed") {
      return state.todos.filter(todo => todo.completed);
    } else {
      return state.todos;
    }
  });

  const filter = computed(() => state.filter);

  const remaining = computed(() => {
    return state.todos.filter(todo => !todo.completed).length;
  });

  const addTodo = (newTask: Todo) => {
    state.todos.push(newTask);
  };
  const deleteTodo = (todo: Todo) => {
    let index = state.todos.indexOf(todo);
    state.todos.splice(index, 1);
  };
  const toggle = (todo: Todo) => {
    todo.completed = !todo.completed;
  };
  const updateTodo = (todo: Todo, newTitle: string) => {
    todo.title = newTitle;
  };
  const checkAllTodo = e => {
    state.todos.forEach(todo => {
      todo.completed = e.target.checked;
    });
  };
  const clearCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.completed);
  };
  const showClearCompletedButton = computed(() => {
    return state.todos.filter(todo => todo.completed).length > 0;
  });

  return {
    filteredTodos,
    changeFilter,
    filter,
    addTodo,
    deleteTodo,
    toggle,
    updateTodo,
    remaining,
    checkAllTodo,
    clearCompleted,
    showClearCompletedButton
  };
};

export type TodoStore = ReturnType<typeof useTodo>;
export default useTodo;
