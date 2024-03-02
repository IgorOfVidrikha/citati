// Импортируем библиотеку Axios для запросов к API
import axios from 'axios';

// Получаем случайную цитату из API
const getQuote = async () => {
  const response = await axios.get('https://quotes.rest/qod');
  return response.data.contents.quotes[0];
};

// Отображаем цитату
const displayQuote = (quote) => {
  document.getElementById("quote").textContent = quote.quote;
  document.getElementById("author").textContent = quote.author;
};

// Обработчик события для кнопки
document.getElementById("button").addEventListener("click", async () => {
  const quote = await getQuote();
  displayQuote(quote);
});

// Обработчик события для кнопки Twitter
document.getElementById("twitter-button").addEventListener("click", async () => {
  const quote = await getQuote();
  const tweet = `"${quote.quote}" - ${quote.author}`;
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
});

// Устанавливаем начальную цитату
const initialQuote = await getQuote();
displayQuote(initialQuote);
