async function fetchAppointments() {
    try {
        const response = await fetch('https://www.codekst.com.br/agendamento'); // Ajuste o endpoint conforme necessário
        if (!response.ok) throw new Error('Erro ao buscar agendamentos');
        
        const appointments = await response.json();
        displayAppointments(appointments);
    } catch (error) {
        console.error(error);
    }
}

function displayAppointments(appointments) {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.paciente}</td>
            <td>${appointment.data}</td>
            <td>${appointment.hora}</td>
            <td>${appointment.procedimento}</td>
        `;
        appointmentsList.appendChild(row);
    });
}

// Chama a função para buscar e exibir os agendamentos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchAppointments);
