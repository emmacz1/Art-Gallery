document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    const modal = document.getElementById("artModal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalArtist = document.getElementById("modal-artist");
    const modalDescription = document.getElementById("modal-description");
    const span = document.getElementsByClassName("close")[0];

    fetch('https://api.artic.edu/api/v1/artworks')
        .then(response => response.json())
        .then(data => {
            const artworks = data.data.slice(0, 10); // Display first 10 artworks

            artworks.forEach(artwork => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const img = document.createElement('img');
                img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
                img.alt = artwork.title;

                const title = document.createElement('h2');
                title.textContent = artwork.title;

                const artist = document.createElement('p');
                artist.textContent = `By: ${artwork.artist_title}`;

                galleryItem.appendChild(img);
                galleryItem.appendChild(title);
                galleryItem.appendChild(artist);
                galleryContainer.appendChild(galleryItem);

                galleryItem.addEventListener('click', () => {
                    modalImage.src = img.src;
                    modalTitle.textContent = artwork.title;
                    modalArtist.textContent = `By: ${artwork.artist_title}`;
                    modalDescription.textContent = artwork.thumbnail.alt_text; // Assuming description is in alt_text
                    modal.style.display = "block";
                });
            });
        })
        .catch(error => console.error('Error fetching artworks:', error));

    span.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
