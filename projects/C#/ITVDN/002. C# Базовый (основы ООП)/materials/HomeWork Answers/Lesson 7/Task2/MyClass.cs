using System;

namespace Task_2
{
    public static class MyClass
    {
        public static void Sort(Train[] trains)
        {
            for (int i = 0; i < trains.Length; i++)
            {
                for (int q = 0; q < trains.Length; q++)
                {
                    if (trains[i].Nomer <= trains[q].Nomer)
                    {
                        Train g = trains[i];
                        trains[i] = trains[q];
                        trains[q] = g;
                    }
                }
            }
        }

        public static void Search(Train[] train, int poisk)
        {
            bool ok = false;
            for (int i = 0; i < train.Length; i++)
            {
                if (train[i].Nomer == poisk)
                {
                    Console.WriteLine("Номер поезда: {0} Пункт назначения: {1} Дата и время отправления: {2} ",
                                      train[i].Nomer, train[i].Punkt, train[i].Time);
                    ok = true;

                }
            }
            if (!ok)
                Console.WriteLine("Поезд не найден!");
        }

        public static void AddingAnArray(Train[] train)
        {
            for (int i = 0; i < train.Length; i++)
            {
                Console.Write("Введите пункт назначения поезда:");
                string punkt = Console.ReadLine();
                punkt = string.IsNullOrEmpty(punkt) ? "Не указан пункт назначения" : punkt;

                Console.Write("Введите номер поезда:");
                string d = Console.ReadLine();
                int nomer = string.IsNullOrEmpty(d) ? 0 : Convert.ToInt32(d);

                Console.Write("Введите дату отправления:");
                d = Console.ReadLine();
                DateTime date = string.IsNullOrEmpty(d) ? DateTime.Now : DateTime.Parse(d);

                train[i] = new Train(punkt, nomer, date);
            }
        }

        public static void Show(Train[] train)
        {
            for (int i = 0; i < train.Length; i++)
            {
                Console.WriteLine("Номер поезда: {0} Пункт назначения: {1} Дата и время отправления: {2} ", train[i].Nomer,
                                  train[i].Punkt, train[i].Time);

            }
        }
    }
}
