"use client";

import { useState } from 'react';

export default function BookForm() {
    const [coverUrl, setCoverUrl] = useState('');

    return (
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Livro</h1>

            {coverUrl && (
                <div className="mb-4 text-center">
                    <img
                        src={coverUrl}
                        alt="Pré-visualização da capa"
                        className="max-w-xs mx-auto h-auto rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Título */}
            <div className="mb-4">
                <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">
                    Título:
                </label>
                <input type="text" id="titulo" name="titulo" required className="w-full px-3 py-2 border rounded-lg" />
            </div>

            {/* Autor */}
            <div className="mb-6">
                <label htmlFor="autor" className="block text-gray-700 font-bold mb-2">
                    Autor:
                </label>
                <input type="text" id="autor" name="autor" required className="w-full px-3 py-2 border rounded-lg" />
            </div>

            {/* Total de Páginas */}
            <div className="mb-4">
                <label htmlFor="paginas" className="block text-gray-700 font-bold mb-2">
                    Total de Páginas:
                </label>
                <input type="number" id="paginas" name="paginas" className="w-full px-3 py-2 border rounded-lg" />
            </div>

            {/* URL da Capa */}
            <div className="mb-6">
                <label htmlFor="capa" className="block text-gray-700 font-bold mb-2">
                    URL da Capa:
                </label>
                <input
                    type="url"
                    id="capa"
                    name="capa"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                />
            </div>

            {/* --- NOVOS CAMPOS ADICIONADOS AQUI --- */}
            
            {/* Campo: Status de Leitura (com menu <select>) */}
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                    Status de Leitura:
                </label>
                <select 
                    id="status" 
                    name="status" 
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                    <option value="para-ler">Quero Ler</option>
                    <option value="lendo">Lendo</option>
                    <option value="lido">Lido</option>
                </select>
            </div>

            {/* Campo: Notas Pessoais (com <textarea>) */}
            <div className="mb-6">
                <label htmlFor="notas" className="block text-gray-700 font-bold mb-2">
                    Notas Pessoais:
                </label>
                <textarea 
                    id="notas" 
                    name="notas" 
                    rows={4} 
                    className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
            </div>

            {/* --- FIM DOS NOVOS CAMPOS --- */}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Adicionar Livro
            </button>
        </form>
    );
}