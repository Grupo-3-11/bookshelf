"use client";
import { useState } from 'react';

// --- CORREÇÃO FINAL APLICADA AQUI: Adicionamos chaves {} nos imports ---
import { StatsCard } from '@/components/StatsCard';
import { BookCard } from '@/components/BookCard';
import { books } from '@/components/data/books';

export default function DashboardPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const allBooks = books;
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 md:p-8">
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatsCard title="Total de Livros" value={allBooks.length} />
                    <StatsCard title="Lendo" value={2} /> 
                    <StatsCard title="Lidos" value={1} /> 
                    <StatsCard title="Páginas Lidas" value={320} /> 
                </div>
            </section>
            <section>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold mb-4 md:mb-0">Biblioteca</h2>
                    <input
                        type="text"
                        placeholder="Buscar por título ou autor..."
                        className="w-full md:w-80 p-3 border rounded-lg shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))
                    ) : (
                        <p>Nenhum livro encontrado.</p>
                    )}
                </div>
            </section>
        </div>
    );
}