export const sampleData = {
  className: 'Taller de Desarrollo Web',
  totalSessions: 12,
  completedSessions: 4,
  classes: [
    {
      id: 'c1',
      title: 'Clase 1: HTML básico',
      activities: [
        { id: 'a1', name: 'Estructura de una página', points: 10 },
        { id: 'a2', name: 'Etiquetas de texto', points: 10 },
        { id: 'a3', name: 'Enlaces e imágenes', points: 10 },
      ],
    },
    {
      id: 'c2',
      title: 'Clase 2: CSS',
      activities: [
        { id: 'a4', name: 'Colores y tipografía', points: 10 },
        { id: 'a5', name: 'Cajas y espaciado', points: 10 },
        { id: 'a6', name: 'Diseño con flexbox', points: 10 },
      ],
    },
    {
      id: 'c3',
      title: 'Clase 3: Portafolio',
      activities: [
        { id: 'a7', name: 'Crear la página de inicio', points: 10 },
        { id: 'a8', name: 'Sección de proyectos', points: 10 },
        { id: 'a9', name: 'Publicar el sitio', points: 10 },
      ],
    },
    {
      id: 'c4',
      title: 'Clase 4: Pulido final',
      activities: [
        { id: 'a10', name: 'Versión móvil', points: 10 },
        { id: 'a11', name: 'Animaciones simples', points: 10 },
        { id: 'a12', name: 'Revisión entre compañeros', points: 10 },
      ],
    },
  ],
  students: [
    { id: 's1', name: 'Ana', portfolioUrl: 'https://example.com', completed: ['a1','a2','a3','a4','a5','a6','a7','a8'] },
    { id: 's2', name: 'Luis', portfolioUrl: 'https://example.com', completed: ['a1','a2','a3','a4','a5','a6','a7'] },
    { id: 's3', name: 'Sofía', portfolioUrl: '', completed: ['a1','a2','a3','a4','a5','a6'] },
    { id: 's4', name: 'Diego', portfolioUrl: 'https://example.com', completed: ['a1','a2','a3','a4','a5'] },
    { id: 's5', name: 'Valeria', portfolioUrl: '', completed: ['a1','a2','a3','a4'] },
    { id: 's6', name: 'Mateo', portfolioUrl: 'https://example.com', completed: ['a1','a2','a3'] },
    { id: 's7', name: 'Camila', portfolioUrl: '', completed: ['a1','a2'] },
    { id: 's8', name: 'Andrés', portfolioUrl: '', completed: ['a1','a2'] },
    { id: 's9', name: 'Renata', portfolioUrl: '', completed: ['a1'] },
    { id: 's10', name: 'Joaquín', portfolioUrl: '', completed: [] },
  ],
}