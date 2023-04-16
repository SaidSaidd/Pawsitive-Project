document.addEventListener("DOMContentLoaded", function () {
    const openRegistrationBtn = document.getElementById("open-registration-btn");
    const registrationModal = document.getElementById("registration-modal");
  
    openRegistrationBtn.addEventListener("click", function () {
      registrationModal.style.display = "block";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == registrationModal) {
        registrationModal.style.display = "none";
      }
    });
  });
  