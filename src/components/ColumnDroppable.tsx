import { useDroppable } from '@dnd-kit/core';

function ColumnDroppable({ id, className, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? 'bg-primary/10' : ''}`}
    >
      {children}
    </div>
  );
}

export default ColumnDroppable;