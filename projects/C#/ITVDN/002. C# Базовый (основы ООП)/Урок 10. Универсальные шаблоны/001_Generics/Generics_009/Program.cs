/*2020.06.26 13:00 IMM*/

using System;

// Контрвариантность обобщений.
// Контрвариантность обобщений в C# 4.0 ограничена делегатами.

namespace Generics
{
    // базовый класс
    class Animal { }

    // производный класс
    class Cat : Animal { }

    class Program
    {
        /*
        метод, который будет сообщён с классом-делегатом MyDelegate, ничего
        не принимает и возвращает значение типа указателя места заполнения типом - Т.

        Для параметров универсального типа ключевое слово out указывает, что параметр типа 
        является ковариантным. Ключевое слово out может применяться в универсальных 
        интерфейсах и делегатах.
        */
        delegate T MyDelegate<out T>();  // out - для возвращаемого значения

        // метод, который ничего не принимает и возвращает новый экземпляр класса Cat
        public static Cat CatCreator()
        {
            return new Cat();
        }

        static void Main()
        {
            /*
            Создаем новый экземпляр обобщенного класса-делегата MyDelegate, закрываем
            его типом <Cat> и сообщаем с ним метод CatCreator().

            Экземпляр обобщенного класса-делегата MyDelegate присваивается переменной
            delegateCat типа класса-делегата MyDelegate, закрытого классом <Cat> 
            */
            MyDelegate<Cat> delegateCat = new MyDelegate<Cat>(CatCreator);

            /*
            а переменная делегата delegateCat присваивается переменной delegateAnimal
            типа класса-делегата MyDelegate, закрытого типом <Animal>, благодаря чему
            произойдет приведение от производного к базовому типу.

            Без ключевого слова out в определении delegate T MyDelegate<out T>() в 
            строке ниже будет ошибка - не удается неявно преобразовать тип Cat в
            тип Animal, т.е. без явного указания ковариантности запрещается upcast 
            параметра типа
            */
            MyDelegate<Animal> delegateAnimal = delegateCat;

            /*
            На переменной делегата delegateAnimal вызываем метод, сообщенный с делегатом - 
            CatCreator(), который возвращает новый экземпляр класса Cat. Последний 
            присваивается переменной animal типа Animal
            */
            Animal animal = delegateAnimal.Invoke();

            // вывести тип объекта в переменной animal
            Console.WriteLine(animal.GetType().Name);

            // Delay.
            Console.ReadKey();
        }
    }
}
