import { InjectionKey } from "@vue/composition-api";
import { TodoStore } from "./useTodo";

const TodoKey: InjectionKey<TodoStore> = Symbol("TodoStore");
export default TodoKey;
