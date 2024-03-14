import fs from 'fs/promises'; // Використовуйте fs/promises для асинхронних операцій
import { specs } from '../docs/swagger/swager.js'; // Переконайтеся, що шлях вірний

// Оскільки specs використовується для генерації документації в swager.mjs, вам потрібно або зробити specs експортованим,
// або змінити підхід до генерації специфікації. Цей приклад припускає, що ви можете отримати specs безпосередньо.

const swaggerDoc = JSON.stringify(specs, null, 2); // Тут вам потрібно вирішити, як отримати специфікацію з swaggerDocs

await fs
  .writeFile('./docs/swagger/swaggerSolidApi.json', swaggerDoc)
  .then(() =>
    console.log('Swagger специфікація успішно збережена у файлі swaggerOutput.json'),
  )
  .catch((err) => console.error('Помилка під час запису файлу: ', err));
