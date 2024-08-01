# 1. Usa un'immagine di base Node.js
FROM node:18-alpine

# 2. Imposta la directory di lavoro all'interno del container
WORKDIR /app

# 3. Copia i file di configurazione nella directory di lavoro
COPY package*.json ./

# 4. Installa le dipendenze
RUN npm install

# 5. Copia il resto del codice sorgente nella directory di lavoro
COPY . .

# 6. Comando per eseguire l'applicazione (assumendo che l'app sia avviata con `npm run dev`)
CMD ["npm", "run", "dev"]
