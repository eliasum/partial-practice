/*2020.07.02 15:56 IMM*/

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
        метод, который будет сообщён с классом-делегатом MyDelegate, принимает один
        пераметр типа указателя места заполнения типом - Т и ничего не возвращает.

        Для параметров универсального типа ключевое слово in указывает, что параметр 
        типа является контрвариантным. Ключевое слово in может применяться в 
        универсальных интерфейсах и делегатах.
        */
        delegate void MyDelegate<in T>(T a);  // in - для аргумента.

        // метод, который принимает параметр типа Animal и ничего не возвращает
        public static void CatUser(Animal animal)
        {
            // вывести тип объекта в переменной animal
            Console.WriteLine(animal.GetType().Name);
        }

        static void Main()
        {
            /*
            Создаем новый экземпляр обобщенного класса-делегата MyDelegate, закрываем
            его типом <Animal> и сообщаем с ним метод CatUser().

            Экземпляр обобщенного класса-делегата MyDelegate присваивается переменной
            delegateAnimal типа класса-делегата MyDelegate, закрытого классом <Animal> 
            */
            MyDelegate<Animal> delegateAnimal = new MyDelegate<Animal>(CatUser);

            /*
            а переменная делегата delegateAnimal присваивается переменной delegateCat
            типа класса-делегата MyDelegate, закрытого типом <Cat>, благодаря чему
            произойдет приведение от базового к производному параметру типа.

            Без ключевого слова in в определении delegate void MyDelegate<in T>(T a)
            в строке ниже будет ошибка - не удается неявно преобразовать тип Animal в
            тип Cat, т.е. без явного указания контрвариантности запрещается downcast 
            параметра типа
            */
            MyDelegate<Cat> delegateCat = delegateAnimal;

            /*
            На переменной делегата delegateAnimal вызываем метод, сообщенный с делегатом - 
            CatUser(), который принимает в первом случае новый экземпляр класса Animal,
            а во втором - Cat. 
            */
            delegateAnimal(new Animal());
            delegateCat(new Cat());

            /*
            Не сработает, т.к. нельзя сделать downcast без предварительного upcast`а
            */
            //delegateCat(new Animal()); 

            // Delay.
            Console.ReadKey();
        }
    }
}
