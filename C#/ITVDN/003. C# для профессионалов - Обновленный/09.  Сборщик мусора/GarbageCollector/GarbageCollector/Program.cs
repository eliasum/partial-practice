/*2020.10.20 22:21 IMM*/

using System;
using System.Threading;

// ПОКОЛЕНИЯ (Генерации)
// Поколение 0 - Объекты не проверялись сборщиком мусора.
// Поколение 1 - Объекты пережившие одну проверку сборщиком мусора 
//               (а также объекты помеченные на удаление, но не удаленные,
//               так как в управляемой куче было достаточно свободного места).
// Поколение 2 - Объекты которые пережили более чем одну проверку сборщиком мусора.

namespace GarbageCollector
{
    // класс для маленького объекта, который попадет в нулевое поколение
    class NormalObject
    {
        // массив элементов типа byte размерностью в 1024 элемента
        byte[] array = new byte[1024]; // 1 KB

        // конструктор
        public NormalObject()
        {
            Console.WriteLine("Constructor {0}", this.GetHashCode());
        }

        // деструктор, который вызывается сборщиком мусора перед удалением объекта 
        ~NormalObject()
        {
            Console.WriteLine("Destructor {0}", this.GetHashCode());
        }
    }

    /*
    класс, объекты которого будут наполнять нулевое поколение, чтобы
    вытеснить объект класса NormalObject в первое поколение и далее во второе 
    */
    class OtherObject
    {
        byte[] array = new byte[1024 * 50]; // 50 KB
    }

    class Program
    {
        // вспомогательный метод для наполнения кучи множеством 50 кБ объектов 
        static void AuxiliaryMethod()
        {
            /*
            массив элементов типа OtherObject размерностью в 1000 элементов.
            Количества этих объектов достаточно, чтобы вытеснить объект типа 
            NormalObject во второе поколение
            */
            OtherObject[] objects = new OtherObject[1000];

            // наполнение массива objects новыми экземплярами
            for (int i = 0; i < objects.Length; i++)
            {
                objects[i] = new OtherObject();
                //OtherObject @object = new OtherObject();

                Thread.Sleep(5);
            }
        }

        static void Main()
        {
            /*
            Класс-объект GC управляет системным сборщиком мусора — службой, 
            которая автоматически высвобождает неиспользуемую память.
            */
            Console.WriteLine("Система поддерживает {0} поколения.", (GC.MaxGeneration + 1));
            Console.WriteLine(new string('-', 40));

            // тестовый объект
            NormalObject @object = new NormalObject();

            // Параллельное наполнение малой кучи другими объектами.
            /*
            Запускаем асинхронно, т.е. в контексте вторичного потока метод
            AuxiliaryMethod, который будет создавать на куче много 50 кБ объектов
            */
            new Thread(AuxiliaryMethod).Start();

            for (int i = 0; i < 30; i++)
            {
                Console.Write("Поколение: {0} | ", GC.GetGeneration(@object));

                /*
                GC.GetTotalMemory(false) - false говорит о том, что при получении размера
                занимаемой памяти на куче не нужно запускать процесс сборки мусора
                */
                Console.WriteLine("Размер кучи = {0} KB", GC.GetTotalMemory(false) / 1024); // true
                Thread.Sleep(100);
            }

            Console.WriteLine(new string('-', 40));

            // количество проверок сборщиком мусора каждого поколения
            Console.WriteLine("Поколение 0 проверялось {0} раз", GC.CollectionCount(0));
            Console.WriteLine("Поколение 1 проверялось {0} раз", GC.CollectionCount(1));
            Console.WriteLine("Поколение 2 проверялось {0} раз", GC.CollectionCount(2));

            Console.WriteLine(new string('-', 40));
        }
    }
}
