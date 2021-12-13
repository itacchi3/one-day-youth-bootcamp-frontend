import React from "react";
import { Task } from "..";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTaskLabel: string;
  setNewTaskLabel: React.Dispatch<React.SetStateAction<string>>;
  editingLabelIndex: number | null;
  setEditingLabelIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TaskForm: React.FC<Props> = ({
  tasks,
  setTasks,
  newTaskLabel,
  setNewTaskLabel,
  editingLabelIndex,
  setEditingLabelIndex,
}) => {
  // フォームの値を保持する
  const handleNewTaskLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };

  // Taskの登録
  const handleAddTask = () => {
    const newTask = { label: newTaskLabel, isDone: false };
    setTasks([...tasks, newTask]);
    setNewTaskLabel("");
  };

  // 修正したTaskの登録
  const handleEditTask = () => {
    const newEditTasks = tasks.map((task, _i) => {
      return _i === editingLabelIndex ? { ...task, label: newTaskLabel } : task;
    });
    setTasks(newEditTasks);
    setNewTaskLabel("");
    setEditingLabelIndex(null);
  };

  // 完了したTaskを削除する
  const handleClearTasks = () => {
    const newTasks = tasks.filter((task) => !task.isDone);
    setTasks(newTasks);
    setNewTaskLabel("");
    setEditingLabelIndex(null);
  };

  return (
    <>
      <input
        onChange={handleNewTaskLabel}
        type="text"
        value={newTaskLabel}
        placeholder="Enter the task"
      />
      {editingLabelIndex === null ? (
        <button onClick={handleAddTask}>Add</button>
      ) : (
        <button onClick={handleEditTask}>Edit</button>
      )}

      <br />
      <button onClick={handleClearTasks}>Clear</button>
    </>
  );
};
