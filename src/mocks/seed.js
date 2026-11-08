// ─────────────────────────────────────────────────────────────
// DADOS FICTÍCIOS — usados apenas para demonstração da plataforma.
// Nomes e CPFs são inventados e não pertencem a pessoas reais.
// Edite este arquivo para mudar o que aparece na demo.
// ─────────────────────────────────────────────────────────────
import { STATUS } from '../components/ui/StatusBadge.jsx';

const { CONCLUIDO, EM_ANDAMENTO } = STATUS;

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
    'Exemplo exame',
  ],

  // As 4 primeiras linhas reproduzem a tela de referência.
  patients: [
    { id: 1, nome: 'Aline Costa', cpf: '123.456.789-00', exame: 'Ressonância Magnética', enviado: false, status: CONCLUIDO },
    { id: 2, nome: 'Aline Ramalho', cpf: '234.567.890-11', exame: 'Raio X', enviado: true, status: EM_ANDAMENTO },
    { id: 3, nome: 'Aline de Jesus Pereira Pires', cpf: '345.678.901-22', exame: 'Exemplo exame', enviado: true, status: EM_ANDAMENTO },
    { id: 4, nome: 'Aline Rosário da Costa Lima', cpf: '456.789.012-33', exame: 'Exemplo exame', enviado: false, status: CONCLUIDO },
    { id: 5, nome: 'Bruno Almeida', cpf: '567.890.123-44', exame: 'Tomografia', enviado: false, status: CONCLUIDO },
    { id: 6, nome: 'Carla Menezes', cpf: '678.901.234-55', exame: 'Ultrassonografia', enviado: true, status: EM_ANDAMENTO },
    { id: 7, nome: 'Daniel Souza', cpf: '789.012.345-66', exame: 'Raio X', enviado: true, status: CONCLUIDO },
    { id: 8, nome: 'Eduarda Lima', cpf: '890.123.456-77', exame: 'Ressonância Magnética', enviado: false, status: EM_ANDAMENTO },
    { id: 9, nome: 'Fábio Nunes', cpf: '901.234.567-88', exame: 'Tomografia', enviado: false, status: CONCLUIDO },
    { id: 10, nome: 'Gabriela Rocha', cpf: '012.345.678-99', exame: 'Mamografia', enviado: true, status: CONCLUIDO },
    { id: 11, nome: 'Helena Martins', cpf: '111.222.333-44', exame: 'Ultrassonografia', enviado: false, status: EM_ANDAMENTO },
    { id: 12, nome: 'Igor Teixeira', cpf: '222.333.444-55', exame: 'Densitometria Óssea', enviado: true, status: CONCLUIDO },
    { id: 13, nome: 'Juliana Prado', cpf: '333.444.555-66', exame: 'Ressonância Magnética', enviado: false, status: CONCLUIDO },
    { id: 14, nome: 'Lucas Barros', cpf: '444.555.666-77', exame: 'Tomografia', enviado: true, status: EM_ANDAMENTO },
    { id: 15, nome: 'Mariana Dias', cpf: '555.666.777-88', exame: 'Mamografia', enviado: false, status: CONCLUIDO },
    { id: 16, nome: 'Nicolas Freitas', cpf: '666.777.888-99', exame: 'Ultrassonografia', enviado: true, status: CONCLUIDO },
    { id: 17, nome: 'Otávio Ribeiro', cpf: '777.888.999-00', exame: 'Raio X', enviado: false, status: EM_ANDAMENTO },
    { id: 18, nome: 'Patrícia Gomes', cpf: '888.999.000-11', exame: 'Densitometria Óssea', enviado: true, status: CONCLUIDO },
    { id: 19, nome: 'Rafael Cardoso', cpf: '999.000.111-22', exame: 'Tomografia', enviado: false, status: CONCLUIDO },
    { id: 20, nome: 'Sofia Andrade', cpf: '010.203.040-50', exame: 'Ressonância Magnética', enviado: true, status: EM_ANDAMENTO },
  ],
};
