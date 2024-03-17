import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectListPage from "./pages/ProjectListPage";
import { NotFoundPage } from './pages/NotFoundPage';
import ProjectEditPage from './pages/ProjectsEditPage';

function App() {
  
  const storedProjects = JSON.parse(localStorage.getItem('projects')) // Локально сохраняем проекты.

  const [projects, setProjects] = useState(storedProjects);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  const handleDelete = (selectedProjects) => {
    const updatedProjects = projects.filter(project => !selectedProjects.includes(project.id));
    setProjects(updatedProjects);
  };
  
  return ( 
      <Routes>
        <Route path="/" element={<ProjectListPage projects={projects} onDelete={handleDelete} />} /> 
        <Route path="/projects" element={<ProjectListPage projects={projects} onDelete={handleDelete} />} />
        <Route path="/edit/:projectId" element={<ProjectEditPage projects={projects} setProjects={setProjects} />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes> 
  );
}

export default App;
