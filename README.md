# nest-grapghql

## Запити

### getFruit

Повертає один фрукт.

- **Аргументи**
  - `id: Int!`: ID фрукта.
- **Повертає**
  - `Fruit!`
    - `id: Int!`: ID фрукта.
    - `name: String!`: Назва фрукта.

### getFruits

Повертає список фруктів.

- **Повертає**
  - `[Fruit!]!`
    - `id: Int!`: ID фрукта.
    - `name: String!`: Назва фрукта.

### getVegetables

Повертає список овочів.

- **Повертає**
  - `[Vegetable!]!`
    - `id: Int!`: ID овоча.
    - `name: String!`: Назва овоча.

### getVegetable

Повертає один овоч.

- **Аргументи**
  - `id: Int!`: ID овоча.
- **Повертає**
  - `Vegetable!`
    - `id: Int!`: ID овоча.
    - `name: String!`: Назва овоча.

## Мутації

### createFruit

Створює новий фрукт.

- **Аргументи**
  - `createFruitInput: CreateFruitInput!`: Дані для створення фрукта.
    - `name: String!`: Назва фрукта.
- **Повертає**
  - `Fruit!`
    - `id: Int!`: ID фрукта.
    - `name: String!`: Назва фрукта.

### deleteFruit

Видаляє фрукт.

- **Аргументи**
  - `id: Int!`: ID фрукта.
- **Повертає**
  - `Fruit!`
    - `id: Int!`: ID фрукта.
    - `name: String!`: Назва фрукта.

### updateFruit

Оновлює фрукт.

- **Аргументи**
  - `id: Int!`: ID фрукта.
  - `createFruitInput: CreateFruitInput!`: Нові дані для фрукта.
    - `name: String!`: Назва фрукта.
- **Повертає**
  - `Fruit!`
    - `id: Int!`: ID фрукта.
    - `name: String!`: Назва фрукта.

### createVegetable

Створює новий овоч.

- **Аргументи**
  - `createVegetableInput: CreateVegetableInput!`: Дані для створення овоча.
    - `name: String!`: Назва овоча.
- **Повертає**
  - `Vegetable!`
    - `id: Int!`: ID овоча.
    - `name: String!`: Назва овоча.

### updateVegetable

Оновлює овоч.

- **Аргументи**
  - `id: Int!`: ID овоча.
  - `updateVegetableInput: CreateVegetableInput!`: Нові дані для овоча.
    - `name: String!`: Назва овоча.
- **Повертає**
  - `Vegetable!`
    - `id: Int!`: ID овоча.
    - `name: String!`: Назва овоча.

### deleteVegetable

Видаляє овоч.

- **Аргументи**
  - `id: Int!`: ID овоча.
- **Повертає**
  - `Vegetable!`
    - `id: Int!`: ID овоча.
    - `name: String!`: Назва овоча.

### register

Реєструє нового користувача..

- **Аргументи**
  - `createUserInput: CreateUserInput!`: Дані для створення користувача.
    - `username: String!`: Ім'я користувача.
    - `password: String!`: Пароль користувача.
    - `role: String!`: Роль користувача. ('VegetarianMary', 'Admin', 'FruitJohn' )
- **Повертає**
  - `User!`
    - `id: Int!`: ID користувача.
    - `username: String!`: Ім'я користувача.
    - `role: String!`: Роль користувача.

### login

Авторизує користувача.

- **Аргументи**
  - `loginUserInput: LoginUserInput!`: Дані для авторизації користувача.
    - `username: String!`: Ім'я користувача.
    - `password: String!`: Пароль користувача.
- **Повертає**
  - `String!`: Токен для авторизації.
