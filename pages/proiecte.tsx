import React, { useState } from 'react';
import Layout from '../src/app/layout';
import data from '../src/app/data/proiecte.json'; 
import styles from '../src/app/style/ProiectePage.module.css'; // Stiluri personalizate

const ProjectsPage = () => {
    // Extragem lista de proiecte din fișierul JSON
    const projects = data.projects;

    // Primul proiect, care va fi folosit în secțiunea Hero
    const heroProject = projects[0];

    // Restul proiectelor, care vor fi afișate în secțiunea de casete
    const remainingProjects = projects.slice(1);

    // State pentru filtrarea proiectelor
    const [filter, setFilter] = useState('Toate');

    // State pentru paginare
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 16;

    // Funcție pentru filtrarea proiectelor
    const filteredProjects = remainingProjects.filter((project) => {
        if (filter === 'Toate') {
            return true;
        }
        return project.status === filter;
    });

    // Calculează indexul de început și sfârșit pentru paginare
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    // Calculează numărul total de pagini
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // Funcția de click pentru a redirecționa către pagina unui proiect specific
    const handleProjectClick = (dest: string) => {
        window.location.href = '/proiecte/' + dest;
    };

    // Funcții pentru butoanele de navigare (Prev și Next)
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Layout>
            {/* Secțiunea Hero - Primul Proiect */}
            {heroProject && (
                <section className={styles.heroSection}>
                    <div
                        className={styles.heroContentWrapper}
                        onClick={() => handleProjectClick(heroProject.id)}
                    >
                        <h1 className={styles.heroTitle}>{heroProject.title}</h1>
                        <div className={styles.projectDetails}>
                            <span className={styles.projectCategory}>{heroProject.category}</span>
                            <span className={styles.projectStatus}>{heroProject.status}</span>
                        </div>
                        <span className={styles.projectDate}>{heroProject.date}</span>
                    </div>
                </section>
            )}

            {/* Secțiunea de Filtrare */}
            <section className={styles.filterSection}>
                <div className={styles.filterWrapper}>
                    {['Toate', 'Finalizat', 'În desfășurare'].map((status) => (
                        <button
                            key={status}
                            className={`${styles.filterButton} ${filter === status ? styles.activeFilter : ''}`}
                            onClick={() => {
                                setFilter(status);
                                setCurrentPage(1); // Resetăm la prima pagină după filtrare
                            }}
                        >
                            {status === 'Toate' ? 'Toate proiectele' : status}
                        </button>
                    ))}
                </div>
            </section>

            {/* Secțiunea de Proiecte cu casete */}
            <section className={styles.storiesSection}>
                <div className={styles.container}>
                    <div className={styles.cardsWrapper}>
                        {currentProjects.map((project) => (
                            <div
                                key={project.id}
                                className={styles.card}
                                onClick={() => handleProjectClick(project.id)}
                            >
                                <img src={project.image} alt={project.title} />
                                <h3 className={styles.sectionTitle}>{project.title}</h3>
                                <div className={styles.projectDetails}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <span className={styles.projectStatus}>{project.status}</span>
                                </div>
                                <span className={styles.projectDate}>{project.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secțiunea de Navigare pentru paginare */}
                {filteredProjects.length > projectsPerPage && (
                    <div className={styles.paginationWrapper}>
                        <button
                            className={styles.paginationButton}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            &laquo; Pagina anterioară
                        </button>
                        <span className={styles.paginationInfo}>
                            Pagina {currentPage} din {totalPages}
                        </span>
                        <button
                            className={styles.paginationButton}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Următoarea pagină &raquo;
                        </button>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProjectsPage;