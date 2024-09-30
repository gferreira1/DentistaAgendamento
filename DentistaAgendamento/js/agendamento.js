document.addEventListener("DOMContentLoaded", async function (event) {
    let response = await fetch('https://www.codekst.com.br/agendamento', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });

    console.log(response);

    response.forEach((res) => {
        console.log(res.hora);
        console.log(res.procedimento);
    });

    console.log("DOM completamente carregado e analisado");
});


let horarioSelecionado = '';



async function enviarAgendamento() {
    const data = document.getElementById('data').value;
    const nomePaciente = document.getElementById('nomePaciente').value;
    const procedimento = document.getElementById('procedimento').value;

    if (!horarioSelecionado) {
        alert("Por favor, selecione um horário antes de confirmar.");
        return;
    }
    if (!nomePaciente) {
        alert("Por favor, preencha o nome do paciente antes de confirmar.");
        return;
    }

    const dadosAgendamento = {
        "paciente": nomePaciente,
        "data": data,
        "hora": horarioSelecionado,
        "procedimento": procedimento
    };

    console.log("Dados do Agendamento:", dadosAgendamento); // Debugging

    try {
        console.log("Dados do Agendamento try:", dadosAgendamento); // Debugging
        const response = await fetch('https://www.codekst.com.br/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAgendamento)
        });

        if (response) {
            const resultado = await response.json();
            document.getElementById('modal-text').innerText = `Consulta agendada com sucesso!\nNome: ${resultado.paciente || nomePaciente}\nHorário: ${resultado.hora || horarioSelecionado}\nData: ${resultado.data || data}\nProcedimento: ${resultado.procedimento || procedimento}`;
            document.getElementById('modal').style.display = 'flex';

        } else {
            const errorDetails = response.json();
            console.error("Erro do servidor:", errorDetails);
            alert("Erro ao agendar a consulta: " + errorDetails);
        }
    } catch (error) {
        console.log("Dados do Agendamento cath:", dadosAgendamento); // Debugging
        console.error("Erro na comunicação com o servidor:", error);
        alert("Erro na comunicação com o servidor.");
    }
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';

    location.reload();
}

function confirmarAgendamento(horario, button) {
    if (horarioSelecionado) {
        alert("Você já selecionou um horário.");
        return;
    }
    horarioSelecionado = horario;
    button.disabled = true;

    // Desabilitar todos os outros botões
    const buttons = document.querySelectorAll('#horariosDisponiveis button');
    buttons.forEach(btn => {
        if (btn !== button) {
            btn.disabled = true;
        }
    });

    alert(`Horário ${horario} selecionado.`);
}
let response = null;

document.addEventListener("DOMContentLoaded", async function (event) {
    response = await fetch('https://www.codekst.com.br/agendamento', { // Altere para o seu IP
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    //const horariosDisponiveis = document.getElementById('horariosDisponiveis');
    //horariosDisponiveis.innerHTML = ''; // Limpa a lista existente

    /*response.forEach(res => {
        const li = document.createElement('li');
        il.innerHTML = `${res.hora} <button type="button" onclick="confirmarAgendamento('${res.hora}', this)">Selecionar</button>`;
        horariosDisponiveis.appendChild(li);
    });*/

    console.log("DOM completamente carregado e analisado");
});

async function verificarAgenda(input) {
    const dataSelecionada = input.value;
    console.log("Data selecionada:", dataSelecionada);

    const ulDosBotoes = document.querySelector("#horariosDisponiveis");
    const liDosBotoes = ulDosBotoes.querySelectorAll('li');

    const response = await fetch(`https://www.codekst.com.br/agendamento?data=${dataSelecionada}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());


    console.log("Resposta da API:", response);

    liDosBotoes.forEach(li => {
       
        const horario = li.textContent.split(' ')[0]+":00";
        console.log("Verificando horário:", horario);
        const button = document.getElementById(li.textContent.split(' ')[0]);

        // Verifica se o horário está na resposta da API
        const res = response.find((r) => {return r.hora === horario && r.data === dataSelecionada});
        console.log(res);
        if (res) {
            li.style.color = 'red'; // Pinta de vermelho
            button.disabled = true; // Desabilita o botão
            console.log(`${horario} está ocupado.`);
        } else {
            li.style.color = 'green'; // Reseta a cor
            button.disabled = false; // Habilita o botão
            console.log(`${horario} está disponível.`);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hoje = new Date().toISOString().split('T')[0];
    const dataInput = document.getElementById('data'); // Declare a variável aqui
    dataInput.setAttribute('min', hoje);
   
});

