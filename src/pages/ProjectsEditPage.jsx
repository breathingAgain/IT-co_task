import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DEFAULT_IMAGE = 'no_photo.jpg';

function ProjectEditPage({ projects, setProjects }) {
  const { projectId } = useParams();
  const navigate = useNavigate(); 

  const [project, setProject] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
  });

  const [deleteImage, setDeleteImage] = useState(false); 

  useEffect(() => { 
    if (projectId === 'new') {
      setProject({
        id: Date.now(), 
        name: '',
        image: DEFAULT_IMAGE,
        description: '',
      });
    } else {
      const existingProject = projects.find((p) => p.id === parseInt(projectId));
      if (existingProject) {
        setProject(existingProject);
      } else {
        navigate('/'); 
      }
    }
  }, [projectId, projects, navigate]);

  const handleChange = (e) => { // Обработка изменений в полях ввода.
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => { // Обработка фотографии проекта.
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prevProject) => ({
          ...prevProject,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => { //Обновляем массив проектов в зависимости от изменений.
    if (projectId === 'new') {
      setProjects((prevProjects) => [...prevProjects, project]);
    } else {
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === project.id ? project : p))
      );
    }
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Редактирование проекта</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Название:</label>
          <input type="text" id="name" name="name" value={project.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Фотография:</label>
          <input type="file" id="image" name="image" accept="image/jpeg, image/png" onChange={handleImageChange} className="form-control" />
          {<img src={project.image || DEFAULT_IMAGE} style={{ maxWidth: '20%', marginTop: '10px' }}/>}
          <div className="form-check">
            <input type="checkbox" id="deleteImage" name="deleteImage" className="form-check-input"
              checked={deleteImage}
              onChange={(e) => {
                setDeleteImage(e.target.checked);
                if (e.target.checked) {
                  setProject((prevProject) => ({ //Ставим заготовленное фото
                    ...prevProject,
                    image: DEFAULT_IMAGE, 
                  }));
                }
              }}
            />
            <label htmlFor="deleteImage" className="form-check-label">
              Удалить фотографию
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Описание:</label>
          <textarea id="description" name="description" value={project.description} onChange={handleChange} className="form-control" />
        </div>
        <Link to="/" className="btn btn-secondary mx-2">Назад</Link>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
}

export default ProjectEditPage;
