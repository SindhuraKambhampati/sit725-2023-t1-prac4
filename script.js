$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  // Function to add cards to the webpage
  const addCards = (items) => {
    $("#card-section").empty(); // Clear existing cards
    items.forEach((item) => {
      let cardHTML = `
        <div class="col s4 center-align">
          <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${item.path}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
              <p><a href="#"></a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${item.subTitle}<i class="material-icons right">close</i></span>
              <p class="card-text">${item.description}</p>
            </div>
          </div>
        </div>`;
      $("#card-section").append(cardHTML);
    });
  };

  // Function to submit form data
  const submitForm = () => {
    let formData = {
      title: $("#title").val(),
      subTitle: $("#subTitle").val(),
      path: $("#path").val(),
      description: $("#description").val()
    };

    $.ajax({
      url: "/api/cat",
      type: "POST",
      data: formData,
      success: (result) => {
        console.log("Data submitted successfully:", result);
        getProjects(); // Fetch updated data after submission
        $("#title, #subTitle, #path, #description").val(''); // Clear form fields
      },
      error: (error) => {
        console.error("Error submitting data:", error);
      }
    });
  };

  // Function to fetch project data from the server
  const getProjects = () => {
    $.get("/api/projects", (response) => {
      if (response.statusCode == 200) {
        addCards(response.data);
      } else {
        console.error("Error fetching projects:", response);
      }
    }).fail(function(xhr, status, error) {
      console.error("AJAX request failed:", error);
    });
  };

  // Event listener for form submission
  $("#formSubmit").click(() => {
    submitForm();
  });

  // Initial data fetch when the document is ready
  getProjects();
});
