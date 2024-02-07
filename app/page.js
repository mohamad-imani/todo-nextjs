import ToDoList from "@/components/todo-list";

export default function Home() {
  return (
    <section className="h-[100dvh] text-neutral-50">
      <header className="flex justify-center items-center font-bold text-xl p-5 border-b-2 border-blue-950 shadow-white/50 shadow-sm">
        ToDo List
      </header>
      <ToDoList />
    </section>
  );
}
