using System;

namespace Task_3
{
    class Employee
    {
        readonly string surname, name;
        int experience;
        string post;

        public string Surname
        {
            get
            {
                return surname;
            }
        }

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
                if (post == null)
                    return "Должность неизвестна";
                return post;
            }
            set
            {
                if (value != null)
                    post = value;
            }
        }

        public int Experience
        {
            get { return experience; }
            set
            {
                if (value >= 0)
                    experience = value;
            }
        }

        public Employee()
        {
        }

        public Employee(string surname, string name)
        {
            this.surname = surname;
            this.name = name;
        }

        public double CountSalary()
        {
            double salarykoef;
           
            switch (post.ToLower())
            {
                case "manager": salarykoef = 200;
                    break;
                case "developer": salarykoef = 150;
                    break;
                case "secretary": salarykoef = 80;
                    break;
                case "cleaner": salarykoef = 65;
                    break;
                default: salarykoef = 100;
                    break;
            }

            switch (experience)
            {
                case 0: salarykoef *= 1.5;
                    break;
                case 1: salarykoef *= 2;
                    break;
                case 2: salarykoef *= 2.5;
                    break;
                default: salarykoef *= 5;
                    break;
            }
            return salarykoef;
        }

        public void ShowSalary()
        {
            Console.WriteLine("Зарплата {0}, подоходный налог {1}", CountSalary(), CountSalary() * 0.13);
        }
    }
}
