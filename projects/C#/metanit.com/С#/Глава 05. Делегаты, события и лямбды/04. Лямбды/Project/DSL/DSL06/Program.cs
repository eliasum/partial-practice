/*2022.10.11 14:28 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Если лямбда-выражение содержит несколько выражений, тогда нужно использовать оператор 
//return, как в обычных методах:

namespace DSL06
{
    class Program
    {
        /*
            класс-делегат с именем Operation. Метод, сообщенный с данным делегатом,
            будет принимать два целочисленных параметра и возвращать один целочисленный
            параметр
        */
        delegate int Operation(int x, int y);

        static void Main(string[] args)
        {
            /*
                переменной делегата subtract типа Operation присвоить лямбда-выражение,
                которое принимает два целочисленных параметра и возвращант один
                целочисленный параметр
            */
            //var subtract = (int x, int y) =>
            Operation subtract = (int x, int y) =>
            {
                if (x > y) return x - y;
                else return y - x;
            };
            int result1 = subtract(10, 6);  // 4 
            Console.WriteLine(result1);     // 4

            int result2 = subtract(-10, 6);  // 16
            Console.WriteLine(result2);      // 16

            Console.ReadKey();
        }
    }
}


//Добавление и удаление действий в лямбда-выражении

//Поскольку лямбда-выражение представляет делегат, тот как и в делегат, в переменную, которая представляет лямбда-выражение можно добавлять методы и другие лямбды:

//1
//2
//3
//4
//5
//6
//7
//8
//9
//10
//11
//12
//13
//14
//15
//16
//var hello = () => Console.WriteLine("METANIT.COM");

//var message = () => Console.Write("Hello ");
//message += () => Console.WriteLine("World"); // добавляем анонимное лямбда-выражение
//message += hello;   // добавляем лямбда-выражение из переменной hello
//message += Print;   // добавляем метод

//message();
//Console.WriteLine("--------------"); // для разделения вывода

//message -= Print;   // удаляем метод
//message -= hello;   // удаляем лямбда-выражение из переменной hello

//message?.Invoke();  // на случай, если в message больше нет действий

//void Print() => Console.WriteLine("Welcome to C#");
//Hello World
//METANIT.COM
//Welcome to C#
//--------------
//Hello World
//Лямбда-выражение как аргумент метода
//Как и делегаты, лямбда-выражения можно передавать параметрам метода, которые представляют делегат:

//1
//2
//3
//4
//5
//6
//7
//8
//9
//10
//11
//12
//13
//14
//15
//16
//17
//18
//19
//20
//21
//22
//int[] integers = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

//// найдем сумму чисел больше 5
//int result1 = Sum(integers, x => x > 5);
//Console.WriteLine(result1); // 30

//// найдем сумму четных чисел
//int result2 = Sum(integers, x => x % 2 == 0);
//Console.WriteLine(result2);  //20

//int Sum(int[] numbers, IsEqual func)
//{
//int result = 0;
//foreach (int i in numbers)
//{
//if (func(i))
//result += i;
//}
//return result;
//}

//delegate bool IsEqual(int x);
//Метод Sum принимает в качестве параметра массив чисел и делегат IsEqual и возвращает сумму чисел массива в виде объекта int. В цикле проходим по всем числам и складываем их.Причем складываем только те числа, для которых делегат IsEqual func возвращает true. То есть делегат IsEqual здесь фактически задает условие, которому должны соответствовать значения массива.Но на момент написания метода Sum нам неизвестно, что это за условие.


//При вызове метода Sum ему передается массив и лямбда-выражение:

//1
//int result1 = Sum(integers, x => x > 5);
//То есть параметр x здесь будет представлять число, которое передается в делегат:

//1
//if (func(i))
//А выражение x > 5 представляет условие, которому должно соответствовать число.Если число соответствует этому условию, то лямбда-выражение возвращает true, а переданное число складывается с другими числами.

//Подобным образом работает второй вызов метода Sum, только здесь уже идет проверка числа на четность, то есть если остаток от деления на 2 равен нулю:

//1
//int result2 = Sum(integers, x => x % 2 == 0);
//Лямбда-выражение как результат метода
//Метод также может возвращать лямбда-выражение.В этом случае возвращаемым типом метода выступает делегат, которому соответствует возвращаемое лямбда-выражение.Например:

//1
//2
//3
//4
//5
//6
//7
//8
//9
//10
//11
//12
//13
//14
//15
//16
//17
//18
//19
//20
//21
//22
//23
//Operation operation = SelectOperation(OperationType.Add);
//Console.WriteLine(operation(10, 4));    // 14

//operation = SelectOperation(OperationType.Subtract);
//Console.WriteLine(operation(10, 4));    // 6

//operation = SelectOperation(OperationType.Multiply);
//Console.WriteLine(operation(10, 4));    // 40

//Operation SelectOperation(OperationType opType)
//{
//switch (opType)
//{
//case OperationType.Add: return (x, y) => x + y;
//case OperationType.Subtract: return (x, y) => x - y;
//default: return (x, y) => x * y;
//}
//}
//enum OperationType
//{
//    Add, Subtract, Multiply
//}
//delegate int Operation(int x, int y);
//В данном случае метод SelectOperation() в качестве параметра принимает перечисление типа OperationType.
//Это перечисление хранит три константы, каждая из которых соответствует определенной арифметической операции.
//    И в самом методе в зависимости от значения параметра возвращаем определенное лямбда-выражение.
