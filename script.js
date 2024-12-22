document.getElementById('fetchButton').addEventListener('click', fetchArtworks);

async function fetchArtworks() {
  const artworksDiv = document.getElementById('artworks');
  artworksDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=5&fields=id,title,artist_display,date_display,image_id');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayArtworks(data.data);
  } catch (error) {
    artworksDiv.innerHTML = `Error: ${error.message}`;
  }
}

function displayArtworks(artworks) {
  const artworksDiv = document.getElementById('artworks');
  artworksDiv.innerHTML = ''; // Clear previous content

  artworks.forEach(artwork => {
    // Create a container for each artwork
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('artwork');

    if (artwork.image_id) {
      const img = document.createElement('img');
      img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
      img.alt = artwork.title || 'Untitled';
      img.style.width = '100%';

      // Add click event to show details
      img.addEventListener('click', () => showArtworkDetails(artwork));
      artworkElement.appendChild(img);
    } else {
      const noImage = document.createElement('p');
      noImage.textContent = 'Image not available';
      artworkElement.appendChild(noImage);
    }

    artworksDiv.appendChild(artworkElement);
  });
}

function showArtworkDetails(artwork) {
  // Display artwork details in an alert or modal
  alert(`
    Title: ${artwork.title || 'Untitled'}
    Artist: ${artwork.artist_display || 'Unknown'}
    Date: ${artwork.date_display || 'Unknown'}
  `);
}
