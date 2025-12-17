


export const dataFormatter = (date: string | undefined) => {
    if (!date) return 'Data indisponível';
    
    return new Date(date).toLocaleDateString('pt-BR');
}
