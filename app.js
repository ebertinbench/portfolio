// Fonction pour récupérer les paramètres GET
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
  }
  
  // Charger les projets depuis le fichier JSON
  fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    // Récupérer l'ID depuis les paramètres GET
    const projectId = parseInt(getQueryParam('id'), 10);
  
    // Trouver le projet correspondant
    const project = projects.find(p => p.id === projectId);
  
    // Sélectionner le conteneur
    const container = document.getElementById('project-container');
  
    // Si un projet est trouvé, afficher ses détails
    if (project) {
    // Mettre le titre comme un grand titre principal
    container.innerHTML = `<h1>${project.title}</h1>`;
  
    // Parcourir les clés et valeurs du projet
    for (const [key, value] of Object.entries(project)) {
      if (key !== 'id' && key !== 'title' && key !== 'images') {
      // Afficher les listes pour les champs spécifiques
      if (Array.isArray(value)) {
        container.innerHTML += `
        <h3>${key}</h3>
        <ul>
          ${value.map(item => `<li>${item}</li>`).join('')}
        </ul>
        `;
      } else {
        // Affichage standard pour les autres champs
        container.innerHTML += `
        <h3>${key}</h3>
        <p>${value}</p>
        `;
      }
      }
    }
  
    // Gestion des images
    if (project.images && Array.isArray(project.images)) {
      container.innerHTML += '<h3>Images</h3>';
      const imagesHtml = project.images
      .map(imagePath => `<img src="${imagePath}" alt="Image du projet" class="project-image">`)
      .join('');
      container.innerHTML += `<div class="project-images">${imagesHtml}</div>`;
    }
    } else {
    container.innerHTML = '<p>Projet introuvable.</p>';
    }

    // Ajouter une ligne p avec un placeholder
    container.innerHTML += '<p>Cette page a pour seule utilité de consulter un projet. Une fois votre lecture terminée, vous pouvez fermer cet onglet</p>';
  })
  .catch(error => {
    console.error('Erreur lors du chargement des projets:', error);
    document.getElementById('project-container').innerHTML = '<p>Impossible de charger les projets.</p>';
  });