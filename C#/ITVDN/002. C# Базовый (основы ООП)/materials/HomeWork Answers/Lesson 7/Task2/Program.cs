using System;

namespace Task2
{
    class Program
    {
        static void Main()
        {
            var train = new Train[2];

            MyClass.AddingAnArray(train);
            Console.WriteLine(new string('-', 50));

            Console.WriteLine("Вы ввели такую информацию о поездах:");
            Console.WriteLine(new string('-', 50));

            MyClass.Sort(train);
            MyClass.Show(train);

            Console.WriteLine(new string('-', 50));

            Console.WriteLine("Введите номер поезда:");
            int poisk = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine(new string('-', 50));
            MyClass.Search(train, poisk);

            //Delay.
            Console.ReadKey();
        }
    }
}
