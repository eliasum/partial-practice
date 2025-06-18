using System;

namespace Lessons_2
{
    class User
    {
        string login, name, familyname;
        int age;
        public readonly DateTime date;
        
        public string Login
        {
            set { login = value; }
            get
            {
                if (login == null)
                    return "Поле не заполнено";
                return login;
            }
        }

        public string Name
        {
            set { name = value; }
            get
            {
                if (name == null)
                    return "Поле не заполнено";
                return name;
            }
        }

        public string Familyname
        {
            set { familyname = value; }
            get
            {
                if (familyname == null)
                    return "Поле не заполнено";
                return familyname;
            }
        }

        public int Age
        {
            set { age = value; }
            get
            {
                if (age <= 0)
                    return 25;
                return age;
            }
        }
        public User()
        {
            date = DateTime.Now;
        }

        public User(string login, string name, string familyname, int old)
        {
            this.login = login;
            this.name = name;
            this.familyname = familyname;
            this.age = old;
            date = DateTime.Now;
        }

    }
}
