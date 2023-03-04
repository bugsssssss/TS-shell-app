// #!/usr/bin/env node

//?импоорт библиотек
import * as readline from "readline";
import * as fs from "fs";

//? определяем интерфейс для продукта, я использовал отдельный объект для специфичных данных, это тоже можно как-то получше сделать
interface Product {
	type: string;
	info: object;
}

//? создал два интерфейса для каждого вида продуктов
interface IceCream {
	name: string;
	weight: number;
}

interface SoftDrink {
	name: string;
	volume: number;
}

//? обычный массив в котором будут все продукты
let products: Product[] = [];

//
let types = ["ice cream", "soft drink"];
let typesString = "";
types.forEach((element) => {
	typesString += element + "\n";
});

//? readline интерфейс
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

//? функция для отображения меню
function menuDisplay() {
	console.log("Welcome to the Shopping App!");
	console.log("1. Add product");
	console.log("2. Show list");
	console.log("3. Exit");
}
//? вызываю меню
menuDisplay();

//? получать цифры и ориентриоваться по ней
rl.on("line", (input: string) => {
	switch (input) {
		case "1":
			addProduct();
			break;
		// case "2":
		// 	showList();
		// 	break;
		case "3":
			exitApp();
			break;
		default:
			console.log("Invalid input. Please try again.");
	}
});

//? создаю функцию addProduct
function addProduct() {
	let product: Product;
	let productAdded: Boolean = false;
	rl.question(
		`Введите тип продукта. Доступные типы:\n${typesString}`,
		(type: string) => {
			if (type == "ice cream") {
				type = type;
				rl.question(`Введите название продукта: `, (name: string) => {
					name = name;
					rl.question(`Введите вес единицы продукта в граммах: `, (weight) => {
						weight = weight;
						product = {
							type: type,
							info: {
								name: name,
								weight: weight,
							},
						};
						productAdded = true;
						products.push(product);
						console.log(product);
						if (productAdded) {
							productAdded = false;
							menuDisplay();
						}
					});
				});
			} else if (type == "soft drink") {
				type = type;
				rl.question("Введите название продукта: ", (name: string) => {
					name = name;
					rl.question("Введите объем единицы продукта в литрах: ", (volume) => {
						volume = volume;
						product = {
							type: type,
							info: {
								name: name,
								volume: volume,
							},
						};
						productAdded = true;
						products.push(product);
						console.log(product);
						if (productAdded) {
							productAdded = false;
							menuDisplay();
						}
					});
				});
			} else {
				console.log("К сожалению такого типа продуктов не существует :(");
				productAdded = false;
			}
		}
	);
}

// define the showList function
// function showList() {
// 	console.log("Products in bucket:");
// 	products.forEach((product: Product) => {
// 		console.log(`Name: ${product.name} | Price: ${product.price}`);
// 	});
// 	console.log("1. Add product");
// 	console.log("2. View products");
// 	console.log("3. Exit");
// }

// define the exitApp function
function exitApp() {
	console.log("Saving products to file...");
	fs.writeFileSync("products.json", JSON.stringify(products));
	console.log("Goodbye!");
	process.exit(0);
}
