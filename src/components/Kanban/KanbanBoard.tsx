import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useApp } from '../../context/AppContext';
import { TaskStatus } from '../../types';
import KanbanCard from './KanbanCard';
import { Plus } from 'lucide-react';

const KanbanBoard: React.FC = () => {
  const { tasks, updateTask } = useApp();

  const columns = useMemo(() => {
    const columnConfig = [
      { id: TaskStatus.Backlog, title: 'Backlog', color: '#6B7280' },
      { id: TaskStatus.InProgress, title: 'В работе', color: '#3B82F6' },
      { id: TaskStatus.Review, title: 'На проверке', color: '#F59E0B' },
      { id: TaskStatus.Done, title: 'Готово', color: '#10B981' }
    ];

    return columnConfig.map(col => ({
      ...col,
      tasks: tasks.filter(task => task.status === col.id)
    }));
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column - no action needed for now
      return;
    } else {
      // Moving between columns
      const newStatus = destination.droppableId as TaskStatus;
      updateTask(draggableId, { status: newStatus });
    }
  };

  return (
    <div className="h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-6 h-full overflow-x-auto pb-6">
          {columns.map(column => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="bg-gray-50 rounded-lg p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: column.color }}
                    />
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {column.tasks.length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <Plus size={16} />
                  </button>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-3 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                      }`}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={
                                snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
                              }
                            >
                              <KanbanCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;