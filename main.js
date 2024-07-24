const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 41, 123, 4];

// Массив для хранения первых пяти элементов
const firstFive = [];

// Цикл for для перебора первых пяти элементов
for (let i = 0; i < 5; i++) {
    if (i < array.length) { // Проверяем, чтобы избежать выхода за границы массива
        firstFive.push(array[i]);
    }
}


console.log(firstFive);