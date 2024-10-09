using System;

namespace _011
{
    interface IGoEater
    {
        void Go();
        void Eat();
    }

    interface ISecurity : IGoEater
    {
        void Guard();
    }

    class Dog : IGoEater, ISecurity
    {
        public void Go() 
        {
            Console.WriteLine("Dog step!");
        }

        public void Eat() 
        {
            Console.WriteLine("Dog style eat!");
        }

        public void Guard()
        {

        }
    }

    class Cat : IGoEater
    {
        public void Go()
        {
            Console.WriteLine("Cat step!");
        }

        public void Eat()
        {
            Console.WriteLine("Cat style eat!");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            ISecurity dog = new Dog();
            IGoEater cat = new Cat();

            // если интерфейсы классов совпадают, то эти классы - однотипные
            // класс - конструкция языка, тип же относится к объектам
            // тип определяет набор методов, т.е. интерфейс
            dog.Go();
            dog.Eat();
            //dog.Guard();
                 
            cat.Go();
            cat.Eat();
        }
    }
}
