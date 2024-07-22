document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentsTable = document.getElementById('appointmentsTable');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(appointmentForm);
            const formObject = Object.fromEntries(formData.entries());

            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();
            alert(result.message);
            appointmentForm.reset();
        });
    }

    if (appointmentsTable) {
        fetch('/api/appointments')
            .then((response) => response.json())
            .then((appointments) => {
                appointments.forEach((appointment) => {
                    const row = appointmentsTable.insertRow();
                    row.insertCell(0).innerText = appointment.customer.name;
                    row.insertCell(1).innerText = appointment.customer.age;
                    row.insertCell(2).innerText = appointment.customer.email;
                    row.insertCell(3).innerText = appointment.customer.phone;
                    row.insertCell(4).innerText = appointment.customer.altPhone;
                    row.insertCell(5).innerText = appointment.date;
                    row.insertCell(6).innerText = appointment.time;
                    row.insertCell(7).innerText = appointment.issue;
                    row.insertCell(8).innerText = appointment.message;
                });
            });
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const appointmentForm = document.getElementById('appointmentForm');
//     const appointmentsTable = document.getElementById('appointmentsTable');

//     if (appointmentForm) {
//         appointmentForm.addEventListener('submit', async (e) => {
//             e.preventDefault();

//             const name = document.getElementById('name').value;
//             const email = document.getElementById('email').value;
//             const phone = document.getElementById('phone').value;
//             const date = document.getElementById('date').value;
//             const description = document.getElementById('description').value;

//             const response = await fetch('/api/appointment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name, email, phone, date, description }),
//             });

//             const result = await response.json();
//             alert(result.message);
//             appointmentForm.reset();
//         });
//     }

//     if (appointmentsTable) {
//         fetch('/api/appointments')
//             .then((response) => response.json())
//             .then((appointments) => {
//                 appointments.forEach((appointment) => {
//                     const row = appointmentsTable.insertRow();
//                     row.insertCell(0).innerText = appointment.customer.name;
//                     row.insertCell(1).innerText = appointment.customer.email;
//                     row.insertCell(2).innerText = appointment.customer.phone;
//                     row.insertCell(3).innerText = new Date(appointment.date).toLocaleString();
//                     row.insertCell(4).innerText = appointment.description;
//                 });
//             });
//     }
// });
