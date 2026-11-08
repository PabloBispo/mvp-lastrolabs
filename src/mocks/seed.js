// ─────────────────────────────────────────────────────────────
// DADOS FICTÍCIOS — usados apenas para demonstração da plataforma.
// Nomes e CPFs são inventados e não pertencem a pessoas reais.
// Edite este arquivo para mudar o que aparece na demo.
// ─────────────────────────────────────────────────────────────
import { STATUS } from '../components/ui/StatusBadge.jsx';

const { PENDENTE, EM_ANALISE, APROVADO, CORRECAO } = STATUS;

export const SEED = {
  doctor: {
    name: 'Dra. Camila Rezende',
    initials: 'CR',
    crm: 'CRM 000000',
    specialty: 'Radiologia',
  },

  examTypes: [
    'Ressonância Magnética',
    'Raio X',
    'Tomografia',
    'Ultrassonografia',
    'Mamografia',
    'Densitometria Óssea',
  ],

  // Pendente = laudo ainda não enviado; os demais já têm laudo e seguem a decisão da operadora.
  patients: [
    { id: 1, nome: 'Aline Costa', cpf: '123.456.789-00', exame: 'Ressonância Magnética', guia: 'GU-2026-004507', solicitante: 'Dr. Paulo Neves', enviado: false, status: PENDENTE },
    { id: 2, nome: 'Aline Ramalho', cpf: '234.567.890-11', exame: 'Raio X', guia: 'GU-2026-004514', solicitante: 'Dra. Lúcia Prado', enviado: true, status: EM_ANALISE },
    { id: 3, nome: 'Aline de Jesus Pereira Pires', cpf: '345.678.901-22', exame: 'Ultrassonografia', guia: 'GU-2026-004521', solicitante: 'Dr. Marcos Tavares', enviado: true, status: APROVADO },
    { id: 4, nome: 'Aline Rosário da Costa Lima', cpf: '456.789.012-33', exame: 'Tomografia', guia: 'GU-2026-004528', solicitante: 'Dra. Renata Faria', enviado: false, status: PENDENTE },
    { id: 5, nome: 'Bruno Almeida', cpf: '567.890.123-44', exame: 'Tomografia', guia: 'GU-2026-004535', solicitante: 'Dr. Paulo Neves', enviado: false, status: PENDENTE },
    { id: 6, nome: 'Carla Menezes', cpf: '678.901.234-55', exame: 'Ultrassonografia', guia: 'GU-2026-004542', solicitante: 'Dr. Marcos Tavares', enviado: true, status: CORRECAO },
    { id: 7, nome: 'Daniel Souza', cpf: '789.012.345-66', exame: 'Raio X', guia: 'GU-2026-004549', solicitante: 'Dra. Lúcia Prado', enviado: true, status: APROVADO },
    { id: 8, nome: 'Eduarda Lima', cpf: '890.123.456-77', exame: 'Ressonância Magnética', guia: 'GU-2026-004556', solicitante: 'Dra. Renata Faria', enviado: false, status: PENDENTE },
    { id: 9, nome: 'Fábio Nunes', cpf: '901.234.567-88', exame: 'Tomografia', guia: 'GU-2026-004563', solicitante: 'Dr. Paulo Neves', enviado: true, status: EM_ANALISE },
    { id: 10, nome: 'Gabriela Rocha', cpf: '012.345.678-99', exame: 'Mamografia', guia: 'GU-2026-004570', solicitante: 'Dra. Lúcia Prado', enviado: true, status: APROVADO },
    { id: 11, nome: 'Helena Martins', cpf: '111.222.333-44', exame: 'Ultrassonografia', guia: 'GU-2026-004577', solicitante: 'Dr. Marcos Tavares', enviado: false, status: PENDENTE },
    { id: 12, nome: 'Igor Teixeira', cpf: '222.333.444-55', exame: 'Densitometria Óssea', guia: 'GU-2026-004584', solicitante: 'Dra. Renata Faria', enviado: true, status: APROVADO },
    { id: 13, nome: 'Juliana Prado', cpf: '333.444.555-66', exame: 'Ressonância Magnética', guia: 'GU-2026-004591', solicitante: 'Dr. Paulo Neves', enviado: false, status: PENDENTE },
    { id: 14, nome: 'Lucas Barros', cpf: '444.555.666-77', exame: 'Tomografia', guia: 'GU-2026-004598', solicitante: 'Dra. Lúcia Prado', enviado: true, status: EM_ANALISE },
    { id: 15, nome: 'Mariana Dias', cpf: '555.666.777-88', exame: 'Mamografia', guia: 'GU-2026-004605', solicitante: 'Dra. Renata Faria', enviado: false, status: PENDENTE },
    { id: 16, nome: 'Nicolas Freitas', cpf: '666.777.888-99', exame: 'Ultrassonografia', guia: 'GU-2026-004612', solicitante: 'Dr. Marcos Tavares', enviado: true, status: APROVADO },
    { id: 17, nome: 'Otávio Ribeiro', cpf: '777.888.999-00', exame: 'Raio X', guia: 'GU-2026-004619', solicitante: 'Dr. Paulo Neves', enviado: false, status: PENDENTE },
    { id: 18, nome: 'Patrícia Gomes', cpf: '888.999.000-11', exame: 'Densitometria Óssea', guia: 'GU-2026-004626', solicitante: 'Dra. Lúcia Prado', enviado: true, status: APROVADO },
    { id: 19, nome: 'Rafael Cardoso', cpf: '999.000.111-22', exame: 'Tomografia', guia: 'GU-2026-004633', solicitante: 'Dra. Renata Faria', enviado: false, status: PENDENTE },
    { id: 20, nome: 'Sofia Andrade', cpf: '010.203.040-50', exame: 'Ressonância Magnética', guia: 'GU-2026-004640', solicitante: 'Dr. Marcos Tavares', enviado: true, status: EM_ANALISE },
  ],
};
