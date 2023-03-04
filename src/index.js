"use strict";
// #!/usr/bin/env node
exports.__esModule = true;
//?импоорт библиотек
var readline = require("readline");
var fs = require("fs");
//? обычный массив в котором будут все продукты
var products = [];
//
var types = ["ice cream", "soft drink"];
var typesString = "";
types.forEach(function (element) {
    typesString += element + "\n";
});
//? readline интерфейс
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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
rl.on("line", function (input) {
    switch (input) {
        case "1":
            addProduct();
            break;
        case "2":
            showList();
            break;
        case "3":
            exitApp();
            break;
        default:
            console.log("\u0412\u0432\u0435\u0434\u0435\u043D\u0430 \u043D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430: ".concat(input));
    }
});
//? создаю функцию addProduct
function addProduct() {
    var product;
    var productAdded = false;
    rl.question("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0438\u043F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0442\u0438\u043F\u044B:\n".concat(typesString), function (type) {
        if (type == "ice cream") {
            type = type;
            rl.question("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430: ", function (name) {
                name = name;
                rl.question("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0435\u0441 \u0435\u0434\u0438\u043D\u0438\u0446\u044B \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0432 \u0433\u0440\u0430\u043C\u043C\u0430\u0445: ", function (weight) {
                    weight = weight;
                    product = {
                        type: type,
                        info: {
                            name: name,
                            weight: weight
                        }
                    };
                    productAdded = true;
                    products.push(product);
                    // console.log(product);
                    if (productAdded) {
                        productAdded = false;
                        menuDisplay();
                    }
                });
            });
        }
        else if (type == "soft drink") {
            type = type;
            rl.question("Введите название продукта: ", function (name) {
                name = name;
                rl.question("Введите объем единицы продукта в литрах: ", function (volume) {
                    volume = volume;
                    product = {
                        type: type,
                        info: {
                            name: name,
                            volume: volume
                        }
                    };
                    productAdded = true;
                    products.push(product);
                    // console.log(product);
                    if (productAdded) {
                        productAdded = false;
                        menuDisplay();
                    }
                });
            });
        }
        else {
            console.log("К сожалению такого типа продуктов не существует :(");
            productAdded = false;
        }
    });
}
//? функция showList для отображеня списка
function showList() {
    console.log("Products in bucket:");
    products.forEach(function (product) {
        if (product.type == "ice cream") {
            console.log("Name: ".concat(product === null || product === void 0 ? void 0 : product.info["name"], " | Weight: ").concat(product === null || product === void 0 ? void 0 : product.info["weight"]));
        }
        else if (product.type == "soft drink") {
            console.log("Name: ".concat(product === null || product === void 0 ? void 0 : product.info["name"], " | Volume: ").concat(product === null || product === void 0 ? void 0 : product.info["volume"]));
        }
    });
    menuDisplay();
}
//? и функция для выхода
function exitApp() {
    console.log("Saving products to file...");
    fs.writeFileSync("products.json", JSON.stringify(products));
    console.log("Goodbye!");
    process.exit(0);
}
