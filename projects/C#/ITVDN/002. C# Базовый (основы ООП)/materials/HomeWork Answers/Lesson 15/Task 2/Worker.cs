using System;

namespace Task_2
{
    struct Worker
    {
        int year;
        string name;
        string post;

        public string Name
        {
            get
            {
                return name;
            }
        }

        public string Post
        {
            get
            {
                return post;
            }
        }

        public int Year
        {
            get { return year; }
            set
            {
                if (value <= DateTime.Now.Year && DateTime.Now.Year - value <= 50)
                {
                    year = value;
                }
                else
                {
                    Console.WriteLine("Неверно задан год! Повторите");
                    Year = Convert.ToInt32(Console.ReadLine());
                }
            }
        }

        public int Experience()
        {
            return DateTime.Now.Year - year;
        }

        public Worker(string name, string post, int year)
        {
            this.year = DateTime.Now.Year;
            this.name = name;
            this.post = post;
            this.Year = year;
        }
    }
}
