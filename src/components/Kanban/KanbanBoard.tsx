import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { mockKanbanColumns, mockTasks } from '../../data/mockData';
import { KanbanColumn, Task } from '../../types';
import KanbanCard from './KanbanCard';
import { Plus } from 'lucide-react';

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(mockKanbanColumns);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns.find(col => col.id === source.droppableId);
      if (!column) return;

      const newTasks = Array.from(column.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      setColumns(columns.map(col => 
        col.id === source.droppableId 
          ? { ...col, tasks: newTasks }
          : col
      ));
    } else {
      // Moving between columns
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      
      if (!sourceColumn || !destColumn) return;

      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      
      const [removed] = sourceTasks.splice(source.index, 1);
      removed.status = destination.droppableId as Task['status'];
      destTasks.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        } else if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      }));
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
                        snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
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