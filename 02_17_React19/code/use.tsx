import { Suspense, use, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const fetchData = async () => {
  const response = await fetch("https://dummyjson.com/todos");
  const json = await response.json();

  // throw new Error("Oops! Something went wrong!");

  return json.todos;
};

interface TodoListProps {
  dataPromise: Promise<Todo[]>;
}

const TodoList = ({ dataPromise }: TodoListProps) => {
  const todos = use(dataPromise);

  return todos.map((todo) => <p key={todo.id}>{todo.todo}</p>);
};

export default function App() {
  const [dataPromise, setDataPromise] = useState(() => fetchData());

  const handleRefresh = () => {
    fetchData().then((data) => {
      setDataPromise(Promise.resolve(data));
    });
  };

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <ErrorBoundary fallback={<p>⚠️Something went wrong!</p>}>
        <Suspense fallback={<p>⌛Downloading todos...</p>}>
          <TodoList dataPromise={dataPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
