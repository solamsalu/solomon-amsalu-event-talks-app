document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const talks = document.querySelectorAll('.talk');

  searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    talks.forEach(talk => {
      const categories = talk.dataset.category.toLowerCase();
      if (categories.includes(searchTerm)) {
        talk.style.display = 'block';
      } else {
        talk.style.display = 'none';
      }
    });
  });
});