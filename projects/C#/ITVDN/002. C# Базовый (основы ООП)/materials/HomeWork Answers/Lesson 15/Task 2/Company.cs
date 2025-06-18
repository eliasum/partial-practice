using System;
using System.Linq;

namespace Task_2
{
    class Company
    {
        Worker[] staff;

        public Company()
        {
            string name;
            string post;
            int year;
            string tmp;

            staff = new Worker[5];

            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Введите имя сотрудника");
                name = Console.ReadLine();

                Console.WriteLine("Введите должность");
                post = Console.ReadLine();

                Console.WriteLine("Введите год начала работы ");
                tmp = Console.ReadLine();

                try
                {
                    year = Convert.ToInt32(tmp);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Вы ввели недопустимое значение года.");
                    Console.WriteLine(e.Message);
                    year = DateTime.Now.Year;
                }

                staff[i] = new Worker(name, post, year);
                Console.Clear();
            }
            staff = staff.OrderBy(worker => worker.Name).ToArray<Worker>();
        }

        public string this[int index]
        {
            get
            {
                string answer = "";
                for (int i = 0; i < staff.Length; i++)
                {
                    if (staff[i].Experience() > index)
                    {
                        answer += "Фамилия работника " + staff[i].Name + "\n";
                    }

                }
                if (answer.Length >= 0)
                {
                    return answer;
                }
                return "Нет сотрудников с таким стажем работы";
            }
        }
    }
}
