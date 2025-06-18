namespace Task_2
{
    struct Customer
    {
        readonly string name;
        readonly string model;
        readonly string tel;

        public Customer(string name, string model, string tel)
        {
            this.name = name;
            this.model = model;
            this.tel = tel;
        }

        public string Tel
        {
            get { return tel; }
        }

        public string Model
        {
            get { return model; }
        }

        public string Name
        {
            get { return name; }
        }

        public override string ToString()
        {
            return "Покупатель: " + name + " Модель: " + model + " Телефон: " + tel;
        }
    }
}
