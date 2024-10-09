using System;

namespace ArrayOfDelegates
{
    class Program
    {
        delegate int MyDelegate();
        delegate double MyDel(MyDelegate[] a);

        static int GetRandom()
        {
            return new Random().Next(100);
        }

        static void Main()
        {
            Console.WriteLine("Введите число элементов массива:");
            int n = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(new string('-', 50));

            var array = new MyDelegate[n];

            for (int i = 0; i < array.Length; i++)
            {
                array[i] = () => new MyDelegate(GetRandom).Invoke();
            }

            MyDel d = delegate(MyDelegate[] c)
                                            {
                                                double sr = 0;
                                                for (int i = 0; i < c.Length; i++)
                                                {
                                                    sr += c[i].Invoke();
                                                }
                                                return sr / array.Length;
                                            };

            for (int i = 0; i < array.Length; i++)
            {
                Console.Write(array[i].Invoke() + " ");
            }

            Console.WriteLine("\nСреднее арифметическое элементов {0:##.###}", d(array));

            //Delay
            Console.ReadKey();
        }
    }
}
