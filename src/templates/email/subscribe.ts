export const subscribe = (id: string): string => {
    return `
        <h1>Potwierdzenie zapisu do newslettera</h1>
        <p>Aby potwierdzić kliknij <a href='http://localhost:3000/newsletters/subscribe/${id}'>link</a></p>
    `
}