/*2022.01.01 19:41 IMM*/

using System;
using System.Collections;
using System.Collections.Generic;

namespace Collection
{
    class Program
    {
        static void Main()
        {
            /*
                экземпляр класса ArrayList - коллекция, которая может в себе хранить
                разнотипные элементы (гетерогенные коллекции). Коллекция - 
                объектно-ориентированное представление массива. Коллекция отличается от
                массива богатством функциональности, удобством обращения и т.д.
            */
            ArrayList arrayList = new ArrayList();

            // Boxing.
            /*
                Т.к. в экземпляр класса ArrayList добавляются объекты типа object,
                то ниже происходит операция Boxing - приведение к типу object элементов
                значимого (структурного) типа
            */
            arrayList.Add(1);   // добавить в коллекцию 1
            arrayList.Add((object)2);

            /*
                Unboxing - обратное приведение от object к int
                arrayList[0] - индексатор - обращение к коллекции как массиву
            */
            int i1 = (int)arrayList[0];

            for (int i = 0; i < arrayList.Count; i++)
                Console.WriteLine((int)arrayList[i]);


            Console.WriteLine(new string('-', 3));


            List<int> list = new List<int>();

            // Упаковки нет.
            list.Add(3);
            list.Add(4);

            // Распаковки нет.
            int i3 = list[0];

            for (int i = 0; i < list.Count; i++)
                Console.WriteLine(list[i]);

            // Delay.
            Console.ReadKey();
        }
    }
}
