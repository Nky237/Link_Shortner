
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


  // Function to handle the "Load More" button for section 2
  function loadMoreSection2() {
    var section2AdditionalContent = document.getElementById('section2AdditionalContent');
    var loadMoreBtn2 = document.getElementById('loadMoreBtn2');

    // Toggle the visibility of the additional content section for section 2
    if (section2AdditionalContent.style.display === 'none') {
      section2AdditionalContent.style.display = 'block';
      loadMoreBtn2.textContent = 'Load Less...';
    } else {
      section2AdditionalContent.style.display = 'none';
      loadMoreBtn2.textContent = 'Load More....';
    }
  }

  // Attach event listener to the "Load More" button for section 2
  var loadMoreBtn2 = document.getElementById('loadMoreBtn2');
  loadMoreBtn2.addEventListener('click', loadMoreSection2);
