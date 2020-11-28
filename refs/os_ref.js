const { log } = require('console')
const os = require('os')

// Платформа
console.log(os.platform())

// Архитектура
console.log(os.arch())

// Информация

console.log(os.cpus())

// Свободная память

console.log(os.freemem())

// Общнее кол-во памяти

console.log(os.totalmem())

// Корневая директория

console.log(os.homedir())

// Кол-во систем которые работают

console.log(os.uptime())
