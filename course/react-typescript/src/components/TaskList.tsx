import React, { memo } from "react";
import { Task } from "..";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setEditingLabelIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setNewTaskLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const TaskList: React.FC<Props> = memo(
  ({ tasks, setTasks, setEditingLabelIndex, setNewTaskLabel }) => {
    // Taskの状態を切り替える
    const handleCheckBox = (
      e: React.ChangeEvent<HTMLInputElement>,
      i: number
    ) => {
      const newTasks = tasks.map((task, _i) => {
        return _i === i ? { ...task, isDone: e.target.checked } : task;
      });
      setTasks(newTasks);
    };

    // Taskのラベルを編集する
    const handleClickLabel = (
      e: React.MouseEvent<HTMLDivElement>,
      i: number
    ) => {
      setEditingLabelIndex(i);
      setNewTaskLabel(tasks[i].label);
    };

    return (
      <ul>
        {tasks.map((task, index) => (
          <li
            key={`todo-${index}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "black",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            {task.isDone ? (
              <s>{task.label}</s>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClickLabel(e, index)}
              >
                {task.label}
              </div>
            )}
            <input
              style={{ cursor: "pointer" }}
              onChange={(e) => handleCheckBox(e, index)}
              type="checkbox"
              checked={task.isDone}
            />
          </li>
        ))}
      </ul>
    );
  }
);
