// ─────────────────────────────────────────────────────────────
// API SIMULADA (mock) — não faz nenhuma chamada de rede.
//
// Imita um backend real: toda função é assíncrona e tem latência
// artificial, então a UI já lida com carregamento como faria em produção.
// As alterações (enviar laudo, editar, excluir) ficam salvas no
// localStorage do navegador e podem ser desfeitas com resetDemo().
//
// Para ligar a um backend de verdade, basta reimplementar estas
// funções com fetch() mantendo as mesmas assinaturas.
// ─────────────────────────────────────────────────────────────
import { SEED } from './seed.js';

const STORAGE_KEY = 'lastro-labs-demo:v1';
const LATENCY_MS = { min: 250, max: 600 };

const clone = (v) => JSON.parse(JSON.stringify(v));
const wait = () =>
  new Promise((r) => setTimeout(r, LATENCY_MS.min + Math.random() * (LATENCY_MS.max - LATENCY_MS.min)));

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* localStorage indisponível (aba anônima, bloqueio): usa só memória */
  }
  return clone(SEED);
}

let db = loadDb();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    /* sem persistência: a demo continua funcionando em memória */
  }
}

function findPatient(id) {
  const p = db.patients.find((x) => x.id === id);
  if (!p) throw new Error(`Paciente ${id} não encontrado`);
  return p;
}

export const api = {
  async getDoctor() {
    await wait();
    return clone(db.doctor);
  },

  async getExamTypes() {
    await wait();
    return clone(db.examTypes);
  },

  async listPatients() {
    await wait();
    return clone(db.patients);
  },

  /** Marca o laudo como enviado. */
  async sendReport(id) {
    await wait();
    findPatient(id).enviado = true;
    persist();
    return clone(findPatient(id));
  },

  async updatePatient(id, changes) {
    await wait();
    Object.assign(findPatient(id), changes, { id });
    persist();
    return clone(findPatient(id));
  },

  async deletePatient(id) {
    await wait();
    findPatient(id);
    db.patients = db.patients.filter((p) => p.id !== id);
    persist();
  },

  /** Volta todos os dados para o estado original da demo. */
  async resetDemo() {
    await wait();
    db = clone(SEED);
    persist();
  },
};
