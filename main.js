import mysql from 'mysql';

// Создаем подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Igor',
  password: 'moroz247tank',
  database: 'quotes'
});

// Функция для получения случайной цитаты из базы данных
const getQuoteFromDatabase = () => {
  return new Promise((resolve, reject) => {
    // Выполняем запрос к базе данных
    connection.query('SELECT quote, author FROM quotes_table ORDER BY RAND() LIMIT 1', (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]); // Возвращаем первую (единственную) цитату из результатов
      }
    });
  });
};

// Обновленная функция для отображения цитаты
const displayQuote = (quote) => {
  document.getElementById("quote").textContent = quote.quote;
  document.getElementById("author").textContent = quote.author;
};

// Обработчик события для кнопки
document.getElementById("button").addEventListener("click", async () => {
  try {
    const quote = await getQuoteFromDatabase();
    displayQuote(quote);
  } catch (error) {
    console.error('Error fetching quote from database:', error);
  }
});

// Устанавливаем начальную цитату
(async () => {
  try {
    await connection.connect(); // Подключаемся к базе данных
    const initialQuote = await getQuoteFromDatabase();
    displayQuote(initialQuote);
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
