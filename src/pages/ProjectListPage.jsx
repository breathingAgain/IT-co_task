import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectListPage({ projects, onDelete }) {
  
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Модальное окно подтверждения удаления, появится в случае выбора >1 проекта для удаления.

  const toggleSelect = (projectId) => { // Для выбора проектов чекбоксом.
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleDelete = () => { //Удаление выбранных проектов.
    onDelete(selectedProjects);
    setSelectedProjects([]);
    setShowConfirmation(false);
  };

  const handleDeleteButtonClick = () => { //Обработчик кнопки удаления.
    if (selectedProjects.length > 1) {
      setShowConfirmation(true);
    } else {
      handleDelete();
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Список проектов</h1>
      <div className="row">
        {projects && projects.map((project) => (
        <div key={project.id} className="col-md-4 mb-4">
        <div className="card">
              <div className="card-header">
                <input
                  type="checkbox"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => toggleSelect(project.id)}
                />
              </div>
              <div className="photo-container">
                <img src={project.image }  />
              </div>
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <Link to={`/edit/${project.id}`} className="btn btn-primary mr-2">Редактировать</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/edit/new" className="btn btn-secondary">Создать проект</Link>
        <button className="btn btn-danger" onClick={handleDeleteButtonClick}>Удалить</button>
      </div>
      {showConfirmation && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Подтверждение удаления</h5>
              </div>
              <div className="modal-body">
                <p>Вы уверены, что хотите удалить выбранные проекты?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Отмена</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectListPage;
