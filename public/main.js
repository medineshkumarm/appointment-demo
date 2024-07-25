document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display appointment data
    const appointmentsTable = document.querySelector(".appointmentsTable tbody");

    if (appointmentsTable) {
        fetch("http://localhost:3000/api/appointments")
            .then((response) => response.json())
            .then((appointments) => {
                appointments.forEach((appointment) => {
                    const row = appointmentsTable.insertRow();

                    // Adding checkbox column
                    const checkboxCell = row.insertCell(0);
                    checkboxCell.innerHTML = `
                        <label class="control control--checkbox">
                            <input type="checkbox"/>
                            <div class="control__indicator"></div>
                        </label>
                    `;

                    // Adding data columns
                    row.insertCell(1).innerText = appointment.customer._id;
                    row.insertCell(2).innerText = appointment.customer.name;
                    row.insertCell(3).innerHTML = `
                        ${appointment.customer.email}
                        <br><small><strong>${appointment.customer.phone}</strong></small>
                        `;
                        // <br><small>${appointment.customer.altPhone}</small>
                    row.insertCell(4).innerText = appointment.issues;
                    row.insertCell(5).innerText = appointment.date;
                });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    // Handle form submission
    const appointmentForm = document.getElementById("appointment-form");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(appointmentForm);
            const formObject = Object.fromEntries(formData.entries());

            try {
                const response = await fetch("/api/appointment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formObject),
                });

                const result = await response.json();
                alert(result.message);
                appointmentForm.reset();
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        });
    }

    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(loginForm);
            const formObject = Object.fromEntries(formData.entries());
          
            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formObject),
                });

                const result = await response.json();

                // Handle response
                if (response.ok) {
                    // Successful login
                    alert(result.message || "Login successful!");
                    window.location.href = "/admin"; // Redirect to admin page
                } else {
                    // Failed login
                    alert(result.message || "Login failed. Please try again.");
                }
            } catch (error) {
                console.error("Error in login:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }
});
document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies in the request
    })
    .then(response => {
        if (response.redirected) {
            // Redirect to the URL provided by the server
            window.location.href = response.url;
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
});