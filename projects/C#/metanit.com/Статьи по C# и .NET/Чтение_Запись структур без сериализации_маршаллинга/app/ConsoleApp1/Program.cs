using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.VisualBasic;

namespace ConsoleApp1
{
    class Program
    {
        /*
        2022.06.02 11:46 IMM

        Чтение/Запись структур без сериализации/маршаллинга

        Как правило, для записи структур в файл и последующего их чтения используют сериализацию, либо маршаллинг.
        Однако платформа NET представляет и другие средства для работы со структурами. В частности, мы можем 
        воспользоваться объектом FileSystem и определенными в нем методами. Для использования класса FileSystem
        добавим в проект библиотеку Microsoft.VisualBasic.dll

        Вначале определим структуру State: 
        */

        public struct State
        {
            public string name;
            public int population;
            public double area;
        }

        static void Main(string[] args)
        {
            // Запись файла

            // Создаем массив структур
            State[] states = new State[] { new State() { name = "Russia", population = 10, area = 30 },
                                           new State(){name = "Canada", population = 3, area = 10}};

            if (File.Exists("States.bin")) File.Delete("States.bin");

            // Октрываем файл для записи - сопоставляем его с ключем 1
            FileSystem.FileOpen(1, "States.bin", OpenMode.Binary);
            for (int i = 0; i < states.Length; i++)
            {
                // Записываем в файл одну структуру
                //FileSystem.FilePut(1, states[i]);
                FileSystem.FilePut(1, states, 1, ArrayIsDynamic: false, StringIsFixedLength: false);
            }

            // Перематываем файл на начало для последующего чтения, поскольку после записи указатель
            // находится в конце файла. Но мы могли бы также просто закрыть файл и просто открыть.
            FileSystem.Seek(1, 1);


            //---------------------------------------------------------
            // Чтение файла

            // Список, в который заносим значения из файла
            List<State> newStates = new List<State>();

            // Пока не обнаружен конец файла,читаем его
            while (!(FileSystem.EOF(1)))
            {
                // Создаем новую структуру
                ValueType tempState = new State();
                // Заносим в нее данные
                FileSystem.FileGet(1, ref tempState);
                //Добавляем ее в список
                newStates.Add((State)tempState);
            }

            // Закрываем файл
            FileSystem.FileClose(1);

            // Выводим содержимое списка на экран
            foreach (State s in newStates)
            {
                Console.WriteLine("Name of the state: {0}, population : {1}", s.name, s.population);
            }

            Console.ReadLine();
        }
    }
}
