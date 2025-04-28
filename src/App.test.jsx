import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';

import App from './App.jsx';

describe('App', () => {

    it('Garante o render dos campos de e-mail, senha e o botão de login', () => {
        render(<App />);

        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument();
    });

    it('Exibe mensagem de sucesso quando o login for estritamente o correto', () => {
        render(<App />);

        fireEvent.change(screen.getByPlaceholderText('E-mail'), {
            target: { value: 'eduardo.lino@pucpr.br' },
        });

        fireEvent.change(screen.getByPlaceholderText('Senha'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /acessar/i }));

        expect(screen.getByText('Acessado com sucesso!')).toBeInTheDocument();
    });

    it('Exibe mensagem de erro quando o login for incorreto', () => {
        render(<App />);

        fireEvent.change(screen.getByPlaceholderText('E-mail'), {
            target: { value: 'usuario@errado.com' },
        });

        fireEvent.change(screen.getByPlaceholderText('Senha'), {
            target: { value: 'senhaerrada' },
        });

        fireEvent.click(screen.getByRole('button', { name: /acessar/i }));

        expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
    });

});
