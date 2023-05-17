
  // Function to handle the "Load More" button click
  function loadMore() {
    var additionalContent = document.getElementById('additionalContent');
    var loadMoreBtn = document.getElementById('loadMoreBtn');

    // Toggle the visibility of the additional content section
    if (additionalContent.style.display === 'none') {
      additionalContent.style.display = 'block';
      loadMoreBtn.textContent = 'Load Less ...';
    } else {
      additionalContent.style.display = 'none';
      loadMoreBtn.textContent = 'Load More ....';
    }
  }

  // Attach event listener to the "Load More" button
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', loadMore);

