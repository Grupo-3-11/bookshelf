export const READING_STATUS = {
  QUERO_LER: "QUERO_LER",
  LENDO: "LENDO",
  LIDO: "LIDO", 
  PAUSADO: "PAUSADO",
  ABANDONADO: "ABANDONADO"
} as const;

export type ReadingStatus = keyof typeof READING_STATUS;