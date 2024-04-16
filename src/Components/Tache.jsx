import { useState } from 'react';
export default function Tache({ tache, setTaches, setSumTaches }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(tache.content);

  function onToggleTache(isChecked) {
    setSumTaches(prev => {
      return {
        done: isChecked ? prev.done + 1 : prev.done - 1,
        undone: isChecked ? prev.undone - 1 : prev.undone + 1,
        all: prev.all,
      }
    });

    setTaches(prevTaches => {
      const updatedTaches = prevTaches.map(t => {
        if (t.id === tache.id) {
          return { ...t, isDone: isChecked };
        }
        return t;
      });
      return updatedTaches;
    });
  }

  function onDeleteTache() {
    setSumTaches(prev => {
      return {
        done: prev.done - (tache.isDone ? 1 : 0),
        undone: prev.undone - (tache.isDone ? 0 : 1),
        all: prev.all - 1
      }
    })
    setTaches(prevTaches => prevTaches.filter(t => t.id !== tache.id));
  }
  function onEditTache() {
    if (isEditing) {
      // Mise à jour du contenu de la tâche lorsque l'édition est terminée
      setTaches((prevTaches) =>
        prevTaches.map((t) =>
          t.id === tache.id ? { ...t, content: editedContent } : t
        )
      );
    }
    setIsEditing(!isEditing); // Basculer le mode édition
  }

  function onContentChange(e) {
    setEditedContent(e.target.value);
  }

  return (
    <li>
      <input
        className="tache-checkbox"
        type="checkbox"
        checked={tache.isDone}
        onChange={(e) => onToggleTache(e.target.checked)}
      />
      {isEditing ? (
        <input
          className="tache-content"
          type="text"
          value={editedContent}
          onChange={onContentChange}
          autoFocus
        />
      ) : (
        <span
          className={tache.isDone ? "tache-content checked" : "tache-content"}
          title={tache.description}
        >
          {tache.content}
        </span>
      )}
      <button className='btn btn-editer'
        title={isEditing ? "save" : 'edit'}
        onClick={onEditTache}>
        <i className="material-icons">{isEditing ? 'save' : 'edit'}</i>
      </button>
      <button className='btn btn-delete'
        title="delete"
        onClick={onDeleteTache}
      >
        <i className="material-icons">delete_forever</i>
      </button>
    </li>
  );
}
