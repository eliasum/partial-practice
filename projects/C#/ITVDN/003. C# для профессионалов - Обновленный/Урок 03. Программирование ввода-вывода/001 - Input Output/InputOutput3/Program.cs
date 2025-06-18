/*2022.10.20 15:22 IMM*/
/*2023.12.14 22:39 IMM*/
using System;
using System.IO;

// Создание директорий. Для тестирования данного примера требуется,
// предварительно создать на диске D директорию TESTDIR

namespace InputOutput
{
    class Program
    {
        static void Main()
        {            
            var directory = new DirectoryInfo(@"D:\TESTDIR");
            Console.WriteLine(directory.FullName);

            // Создание в TESTDIR новых подкаталогов.
            if (directory.Exists)
            {
                // Создаем D:\TESTDIR\SUBDIR.
                directory.CreateSubdirectory("SUBDIR");

                // Создаем D:\TESTDIR\MyDir\SubMyDir.
                directory.CreateSubdirectory(@"MyDir\SubMyDir");

                Console.WriteLine("Директории созданы.");
            }
            else
            {
                Console.WriteLine("Директория с именем: {0}  не существует.", directory.FullName);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
