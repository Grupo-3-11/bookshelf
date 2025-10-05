// Local do arquivo: app/lib/data.ts

import { ReadingStatus } from '@prisma/client';
import prisma from './prisma'; // Verifique se seu arquivo do prisma client está na mesma pasta lib

// ---------------------------------
// Funções de Gênero
// ---------------------------------

/**
 * Busca e retorna todos os gêneros do banco de dados.
 * @returns {Promise<Genre[]>} Uma lista de todos os gêneros.
 */
export async function getGenres() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return genres;
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw new Error('Não foi possível buscar os gêneros.');
  }
}

/**
 * Cria um novo gênero no banco de dados se ele ainda não existir.
 * @param {string} genreName - O nome do gênero a ser criado.
 * @returns {Promise<Genre>} O gênero criado ou o já existente.
 */
export async function createGenre(genreName: string) {
  try {
    const genre = await prisma.genre.upsert({
      where: { name: genreName },
      update: {},
      create: { name: genreName },
    });
    return genre;
  } catch (error) {
    console.error('Erro ao criar gênero:', error);
    throw new Error('Não foi possível criar o gênero.');
  }
}

// ---------------------------------
// Funções de Status de Leitura
// ---------------------------------

/**
 * Retorna a lista de opções de status de leitura definidas no schema.
 * @returns {string[]} Um array com os status de leitura (ex: ['LIDO', 'LENDO', ...]).
 */
export function getReadingStatusOptions() {
  return Object.values(ReadingStatus);
}