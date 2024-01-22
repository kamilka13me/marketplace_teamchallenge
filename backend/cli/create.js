// cli/create.js

const fs = require('fs');
const path = require('path');

function createComponent(componentName) {
  // Логіка для створення нового компонента
  const componentPath = path.join(__dirname, '..', 'src', 'components', componentName);
  console.log(componentPath);

  // Перевірка, чи компонент не існує
  if (fs.existsSync(componentPath)) {
    console.error(`Помилка: Компонент "${componentName}" вже існує.`);
    return;
  }

  // Створення папки для компонента
  fs.mkdirSync(componentPath);

  // Сюди можна додати створення файлів або будь-які інші дії, які вам потрібні
  console.log(`Компонент "${componentName}" успішно створено.`);
}

// Отримання ім'я компонента з командного рядка
const componentName = process.argv[2];

// Перевірка, чи передано ім'я компонента
if (!componentName) {
  console.error('Помилка: Введіть ім\'я компонента.');
  process.exit(1);
}

// Виклик функції для створення компонента
createComponent(componentName);
