import React, { createContext, useContext, useState, ReactNode } from 'react';

type Task = {
  title: string;
  completed: boolean;
  notes: string;
  priority: string;
  favorited: boolean;
};

type List = {
  title: string;
  color: string;
  tasks: {
    [taskId: string]: Task;
  };
};

type Lists = {
  [listId: string]: List;
};

type ListsContextType = {
  lists: Lists;
  addUntitledList: () => string;
  addTask: (listId: string, task: Task) => void;
  updateTask: (listId: string, taskId: string, updated: Partial<Task>) => void;
  removeTask: (listId: string, taskId: string) => void;
  updateList: (listId: string, updated: Partial<Omit<List, 'tasks'>>) => void;
  removeList: (listId: string) => void;
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<Lists>({});

  const generateUniqueUntitledName = (): string => {
    const baseName = 'Untitled List';
    if (!lists[baseName]) return baseName;

    let i = 1;
    while (lists[`${baseName} (${i})`]) {
      i++;
    }
    return `${baseName} (${i})`;
  };

  const addUntitledList = () => {
    const name = generateUniqueUntitledName();
    const newList: List = {
      title: name,
      color: 'limegreen', // default color
      tasks: {},
    };
    setLists((prev) => ({ ...prev, [name]: newList }));
    return name;
  };

  const addTask = (listId: string, task: Task) => {
    setLists((prev) => {
      const list = prev[listId];
      if (!list) return prev;

      const taskId = Date.now().toString();
      return {
        ...prev,
        [listId]: {
          ...list,
          tasks: {
            ...list.tasks,
            [taskId]: task,
          },
        },
      };
    });
  };

  const updateTask = (listId: string, taskId: string, updated: Partial<Task>) => {
    setLists((prev) => {
      const list = prev[listId];
      if (!list || !list.tasks[taskId]) return prev;

      return {
        ...prev,
        [listId]: {
          ...list,
          tasks: {
            ...list.tasks,
            [taskId]: {
              ...list.tasks[taskId],
              ...updated,
            },
          },
        },
      };
    });
  };

  const removeTask = (listId: string, taskId: string) => {
    setLists((prev) => {
      const list = prev[listId];
      if (!list || !list.tasks[taskId]) return prev;

      const updatedTasks = { ...list.tasks };
      delete updatedTasks[taskId];

      return {
        ...prev,
        [listId]: {
          ...list,
          tasks: updatedTasks,
        },
      };
    });
  };

  const updateList = (listId: string, updated: Partial<Omit<List, 'tasks'>>) => {
    setLists((prev) => {
      const list = prev[listId];
      if (!list) return prev;

      // If title changed and is different from current key, rename the key
      if (updated.title && updated.title !== listId) {
        if (prev[updated.title]) {
          console.warn(`List with the name "${updated.title}" already exists. Rename aborted.`);
          return prev;
        }

        const updatedList = {
          ...list,
          ...updated,
          title: updated.title,
        };

        const { [listId]: _, ...rest } = prev;

        return {
          ...rest,
          [updated.title]: updatedList,
        };
      }

      // Otherwise just update normally
      return {
        ...prev,
        [listId]: {
          ...list,
          ...updated,
        },
      };
    });
  };

  const removeList = (listId: string) => {
    setLists((prev) => {
      const updated = { ...prev };
      delete updated[listId];
      return updated;
    });
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        addUntitledList,
        addTask,
        updateTask,
        removeTask,
        updateList,
        removeList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};
